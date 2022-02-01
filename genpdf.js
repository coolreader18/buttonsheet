import "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
const { jsPDF } = jspdf;

const inner_button = 1.25;
const outer_button = 1.625;
const page_width = 8.5;
const page_height = 11;
const ncols = 4;
const nrows = 5;
const margin = 0.25;
const gap = (page_width - (margin * 2 + outer_button * ncols)) / (ncols - 1);

const outer_radius = outer_button / 2 - inner_button / 2;

function* make_poss(n, w, padding, startp) {
    let p = startp;
    for (let i = 0; i < n; i++) {
        yield p;
        p += w + padding;
    }
}

const calc_dims = (x, y) => {
    const inner_dims = [x + outer_radius, y + outer_radius, inner_button, inner_button];
    const outer_dims = [x, y, outer_button, outer_button];
    return [inner_dims, outer_dims];
};

const poss = (n) => make_poss(n, outer_button, gap, margin);

const button_positions = [];
for (const y of poss(nrows)) {
    for (const x of poss(ncols)) {
        button_positions.push([x, y, ...calc_dims(x, y)]);
    }
}

export const genPdf = async (layers) => {
    const lays = await Promise.all(
        layers.map((layer) =>
            Promise.all(
                layer.map(async ({ blob, ...alt }) => {
                    const img = await loadImage(blob);
                    const { width, height } = img;
                    const canv = document.createElement("canvas");
                    canv.width = width;
                    canv.height = height;
                    const ctx = canv.getContext("2d");

                    // ctx.fillStyle = "#ffffff";
                    // ctx.fillRect(0, 0, width, height);
                    const hw = width / 2;
                    const hh = height / 2;
                    ctx.ellipse(hw, hh, hw, hh, 0, 0, Math.PI * 2);
                    ctx.clip();

                    ctx.drawImage(img, 0, 0);

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

/** @returns {Promise<HTMLImageElement>} */
const loadImage = (blob) =>
    new Promise((res, rej) => {
        const img = new Image();
        img.addEventListener("load", () => res(img));
        img.addEventListener("error", (ev) => rej(ev.error));
        img.src = URL.createObjectURL(blob);
    });
