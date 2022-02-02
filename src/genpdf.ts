import { jsPDF } from "jspdf";
import iterate from "iterare";

const inner_button = 1.25;
const outer_button = 1.625;
const page_width = 8.5;
const page_height = 11;
const ncols = 4;
const nrows = 5;
const margin = 0.25;
const gap = (page_width - (margin * 2 + outer_button * ncols)) / (ncols - 1);

const outer_radius = outer_button / 2 - inner_button / 2;

function* make_poss(n: number, w: number, padding: number, startp: number) {
    let p = startp;
    for (let i = 0; i < n; i++) {
        yield p;
        p += w + padding;
    }
}

const calc_dims = (x: number, y: number): [Dimension, Dimension] => {
    const inner_dims: Dimension = [x + outer_radius, y + outer_radius, inner_button, inner_button];
    const outer_dims: Dimension = [x, y, outer_button, outer_button];
    return [inner_dims, outer_dims];
};

const poss = (n: number) => make_poss(n, outer_button, gap, margin);

type Dimension = [number, number, number, number];
const button_positions: [number, number, Dimension, Dimension][] = [];
for (const y of poss(nrows)) {
    for (const x of poss(ncols)) {
        button_positions.push([x, y, ...calc_dims(x, y)]);
    }
}

export type Alt = { blob: Blob; full: boolean };

export const genPdf = async (layers: Iterable<Iterable<Alt>>) => {
    const lays = await Promise.all(
        iterate(layers).map((layer) =>
            Promise.all(
                iterate(layer).map(async ({ blob, ...alt }) => {
                    const DPI = 300;
                    const size = (alt.full ? inner_button : outer_button) * DPI;
                    const img = await createImageBitmap(blob);
                    const canv = document.createElement("canvas");
                    canv.width = size;
                    canv.height = size;
                    const ctx = canv.getContext("2d")!;

                    const r = size / 2;
                    ctx.ellipse(r, r, r, r, 0, 0, Math.PI * 2);
                    ctx.clip();

                    ctx.drawImage(img, 0, 0, size, size);

                    return { canv, ...alt };
                })
            )
        )
    );
    const doc = new jsPDF({ unit: "in", format: "letter", compress: true, putOnlyUsedFonts: true });
    let l = 0;
    for (const layer of lays) {
        let i = 0;
        for (const [_x, _y, inner_dims, outer_dims] of button_positions) {
            const alt = layer[i];
            const dims = alt.full ? outer_dims : inner_dims;
            doc.addImage(alt.canv, "PNG", ...dims, `l${l}a${i}`);
            i = (i + 1) % layer.length;
        }
        l += 1;
    }

    const r = outer_button / 2;
    doc.setLineWidth(1 / 72);
    for (const [x, y] of button_positions) {
        doc.circle(x + r, y + r, r);
    }

    return doc;
};
