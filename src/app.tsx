import * as React from "react";
import { FC, useState } from "react";
import { Alt, genPdf } from "./genpdf";
import cx from "classnames";
import iterate from "iterare";
import produce, { enableMapSet } from "immer";
import * as styles from "./style.module.css";
enableMapSet();

let _key = 0;
const key = (): Key => _key++;
type Key = number;

type Layer = Map<Key, Alt>;
const makeAlt = (): Alt => ({ blob: new Blob(), full: false });
const newLayer = (): Layer => new Map([[key(), makeAlt()]]);

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
                        add={() => {
                            setLayers((layers) =>
                                produce(layers, (draft) => {
                                    draft.get(i)!.set(key(), makeAlt());
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
                    name="layer-image"
                    className={styles.hidden}
                    onChange={(e) => {
                        const file = e.target.files![0];
                        setBackgroundImage(`url(${URL.createObjectURL(file)})`);
                        update((alt) => ({ ...alt, blob: file }));
                    }}
                />
                <div
                    role="button"
                    className={cx(
                        styles.layerImg,
                        backgroundImage ? null : styles.uploadIcon,
                        full && styles.layerImgFull
                    )}
                    style={{ backgroundImage }}
                ></div>
            </label>
            <div className={cx(styles.layerConfig, styles.h100)}>
                <div
                    className={cx(styles.h100, styles.textButton)}
                    role="button"
                    onClick={() => update(() => null)}
                >
                    X
                </div>
                <div
                    className={cx(styles.h100, styles.textButton)}
                    role="checkbox"
                    aria-checked={full}
                    onClick={() => update((alt) => ({ ...alt, full: !alt.full }))}
                >
                    {full ? "◎" : "○"}
                </div>
            </div>
        </div>
    );
};

const LayersRow: FC<{
    alts: Map<Key, Alt>;
    update: (k: Key, alt: (alt: Alt) => Alt | null) => void;
    add: () => void;
}> = ({ alts, update, add }) => (
    <div className={styles.layersRow}>
        {iterate(alts)
            .map(([i, alt]) => (
                <ButtonLayer key={i} update={(alt) => update(i, alt)} full={alt.full} />
            ))
            .toArray()}
        <div className={cx(styles.addAlt, styles.textButton)} onClick={add}>
            +
        </div>
    </div>
);
