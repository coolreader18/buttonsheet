import { FunctionComponent as FC, h } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { useState } from "preact/hooks";
import type { Alt } from "./genpdf";
import cx from "classnames";
import iterate from "iterare";
import produce, { enableMapSet } from "immer";
// @ts-ignore
import * as styles from "./style.module.css";
enableMapSet();

let _key = 0;
const key = (): Key => _key++;
type Key = number;

const prevDefault =
    <E extends { preventDefault(): void }>(f: (ev: E) => void) =>
    (ev: E) => {
        ev.preventDefault();
        f(ev);
    };

type Layer = Map<Key, Alt>;
const makeAlt = (): Alt => ({ blob: new Blob(), full: false, pixel: false });
const newLayer = (): Layer => new Map([[key(), makeAlt()]]);

let _genPdf!: Promise<typeof import("./genpdf").genPdf>;
document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
        _genPdf ||= import("./genpdf").then((mod) => mod.genPdf);
    }
});
const genPdf: typeof import("./genpdf").genPdf = async (...args) => (await _genPdf)(...args);

const create = async (layers: Map<Key, Layer>) => {
    const win = window.open()!;
    win.document.write(`<h1 style="text-align:center;">Please wait...</h1>`);
    try {
        const pdf = await genPdf(
            iterate(layers.values())
                .map((layer) => Array.from(layer.values()))
                .toArray()
        );
        win.location = pdf.output("bloburi").toString();
    } catch (err) {
        win.close();
        console.error(err);
        // TODO: error message in the document
        alert("Error while generating pdf: " + err);
    }
};

export const App: FC = () => {
    const [layers, setLayers] = useState<Map<Key, Layer>>(() => new Map([[key(), newLayer()]]));

    return (
        <form className={styles.form} onSubmit={prevDefault(() => create(layers))}>
            <h2>Button sheet generator</h2>
            <p>
                The rows are layers, the different images in each row are "alts" - they'll be tiled
                on the output sheet, so if you have 2 layers made of alts X, Y, Z and A, B the
                output will be XA, YB, ZA, XB, etc.
            </p>
            {iterate(layers)
                .map(([i, layer]) => (
                    <LayersRow
                        key={i}
                        alts={layer}
                        update={(alt, upd) => {
                            setLayers((layers) =>
                                produce(layers, (draft) => {
                                    const layer = draft.get(i)!;
                                    const newVersion = upd(layer.get(alt)!);
                                    if (newVersion) layer.set(alt, newVersion);
                                    else layer.delete(alt);
                                })
                            );
                        }}
                        addAlt={() => {
                            setLayers((layers) =>
                                produce(layers, (draft) => {
                                    draft.get(i)!.set(key(), makeAlt());
                                })
                            );
                        }}
                        removeLayer={() => {
                            setLayers((layers) =>
                                produce(layers, (draft) => {
                                    draft.delete(i);
                                })
                            );
                        }}
                    />
                ))
                .toArray()}
            <p>
                <button
                    onClick={prevDefault((e) => {
                        setLayers((prev) => produce(prev, (draft) => draft.set(key(), newLayer())));
                    })}
                >
                    Add Layer
                </button>
            </p>
            <p>
                <input type="submit" value="Create" />
            </p>
        </form>
    );
};

const ButtonLayer: FC<{
    update: (change: (alt: Alt) => Alt | null) => void;
    alt: Alt;
}> = ({ update, alt: { full, pixel } }) => {
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);
    return (
        <div className={styles.buttonLayer}>
            <label className={styles.dContents}>
                <input
                    type="file"
                    className={styles.hidden}
                    onChange={(e) => {
                        const file = e.currentTarget.files![0];
                        setBackgroundImage(`url(${URL.createObjectURL(file)})`);
                        update((alt) => ({ ...alt, blob: file }));
                    }}
                />
                <button
                    // forward button to file input
                    onClick={prevDefault((e) => e.currentTarget.parentElement!.click())}
                    className={cx(
                        styles.layerImg,
                        backgroundImage ? null : styles.uploadIcon,
                        full && styles.layerImgFull
                    )}
                    style={{ backgroundImage }}
                />
            </label>
            <div className={cx(styles.layerConfig, styles.h100)}>
                <button
                    className={cx(styles.h100, styles.textButton)}
                    onClick={prevDefault((e) => update(() => null))}
                >
                    🗙
                </button>
                <input
                    className={cx(styles.h100, styles.textButton, styles.checkbox)}
                    type="checkbox"
                    checked={full}
                    onChange={(e) => update((alt) => ({ ...alt, full: e.currentTarget.checked }))}
                    style={{ appearance: "none" }}
                    // @ts-ignore
                    checkedMark="◎"
                    uncheckedMark="○"
                />
                <input
                    className={cx(styles.h100, styles.textButton, styles.checkboxPixelart)}
                    type="checkbox"
                    checked={pixel}
                    onChange={(e) => update((alt) => ({ ...alt, pixel: e.currentTarget.checked }))}
                    style={{ appearance: "none" }}
                />
            </div>
        </div>
    );
};

const LayersRow: FC<{
    alts: Map<Key, Alt>;
    update: (k: Key, alt: (alt: Alt) => Alt | null) => void;
    addAlt: () => void;
    removeLayer: () => void;
}> = ({ alts, update, addAlt, removeLayer }) => (
    <div className={styles.layersRow}>
        <button
            className={cx(styles.textButton, styles.removeLayer)}
            onClick={prevDefault(removeLayer)}
        >
            🗙
        </button>
        {iterate(alts)
            .map(([i, alt]) => <ButtonLayer key={i} update={(alt) => update(i, alt)} alt={alt} />)
            .toArray()}
        <button
            tabIndex={0}
            className={cx(styles.addAlt, styles.textButton)}
            onClick={prevDefault(addAlt)}
            style={{ fontSize: "1.5em" }}
        >
            ＋
        </button>
    </div>
);
