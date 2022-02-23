export const prevDefault =
    <E extends { preventDefault(): void }>(f: (ev: E) => void) =>
    (ev: E) => {
        ev.preventDefault();
        f(ev);
    };

export const CANCEL_FILE = Symbol();

export const pickFile = (multiple: boolean = false): Promise<FileList | null> =>
    new Promise((resolve) => {
        let lock = false;
        const inp = document.createElement("input");
        inp.multiple = multiple;
        inp.setAttribute("type", "file");

        inp.addEventListener(
            "change",
            () => {
                lock = true;
                resolve(inp.files!);
            },
            { once: true }
        );

        // file blur
        window.addEventListener(
            "focus",
            () => {
                setTimeout(() => {
                    if (!lock) {
                        resolve(null);
                    }
                }, 300);
            },
            { once: true }
        );

        // open file select box
        inp.click();
    });

const blobUrlRegistry = new FinalizationRegistry(URL.revokeObjectURL);

export const makeObjectURL = (blob: Blob | MediaSource) => {
    const url = URL.createObjectURL(blob);
    blobUrlRegistry.register(blob, url);
    return url;
};
