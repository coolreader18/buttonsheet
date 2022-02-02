import { FunctionComponent as FC, h } from "preact";
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

type Layer = Map<Key, Alt>;
const makeAlt = (): Alt => ({ blob: new Blob(), full: false });
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
        // TODO: error message in the document
        alert("Error while generating pdf: " + err);
    }
};

export const App: FC = () => {
    const [layers, setLayers] = useState<Map<Key, Layer>>(() => new Map([[key(), newLayer()]]));

    return (
        <div className={styles.form}>
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
                    onClick={() =>
                        setLayers((prev) => produce(prev, (draft) => draft.set(key(), newLayer())))
                    }
                >
                    Add Layer
                </button>
            </p>
            <p>
                <button onClick={() => create(layers)}>Create</button>
            </p>
        </div>
    );
};

const ButtonLayer: FC<{
    update: (change: (alt: Alt) => Alt | null) => void;
    full: boolean;
}> = ({ update, full }) => {
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
                    onClick={(e) => e.currentTarget.parentElement!.click()}
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
                    onClick={() => update(() => null)}
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
        <button className={cx(styles.textButton, styles.removeLayer)} onClick={removeLayer}>
            🗙
        </button>
        {iterate(alts)
            .map(([i, alt]) => (
                <ButtonLayer key={i} update={(alt) => update(i, alt)} full={alt.full} />
            ))
            .toArray()}
        <button
            tabIndex={0}
            className={cx(styles.addAlt, styles.textButton)}
            onClick={addAlt}
            style={{ fontSize: "1.5em" }}
        >
            ＋
        </button>
    </div>
);
