import { genPdf } from "./genpdf.js";

// TODO: shadow dom + form-associated custom elements once stabilized
class LightDOMElement extends HTMLElement {
    /** @type {HTMLTemplateElement} */
    static template;
    constructor() {
        super();
        this.is_init = false;
    }
    init() {}
    connectedCallback() {
        if (this.is_init) return;
        this.appendChild(this.constructor.template.content.cloneNode(true));
        this.init();
        this.is_init = true;
    }
}

const define = (id, cls) => {
    cls.template = document.getElementById(id);
    customElements.define(id, cls);
};

define(
    "button-layer",
    class extends LightDOMElement {
        init() {
            /** @type {HTMLInputElement} */
            this.file_input = this.querySelector(".layer-input");
            this.img = this.querySelector(".layer-img");
            this.remove_btn = this.querySelector(".remove-layer");
            this.full = false;
            this.kind_toggle = this.querySelector(".layer-kind");
            this.kind_input = this.querySelector(".layer-kind-input");

            this.file_input.addEventListener("change", () => {
                this.img.classList.remove("upload-icon");
                this.img.style.backgroundImage = `url(${URL.createObjectURL(
                    this.file_input.files[0]
                )})`;
            });
            this.remove_btn.addEventListener("click", () => {
                this.remove();
            });
            this.kind_toggle.addEventListener("click", () => {
                const full_layer = (this.full = !this.full);
                this.kind_toggle.textContent = full_layer ? "◎" : "○";
                this.kind_toggle.setAttribute("aria-checked", full_layer);
                this.kind_input.value = full_layer ? "1" : "";
                this.img.classList.toggle("layer-img-full", full_layer);
            });
        }
        getData() {
            return {
                blob: this.file_input.files[0],
                full: this.full,
            };
        }
    }
);

define(
    "layers-row",
    class extends LightDOMElement {
        init() {
            this.querySelector(".add-alt").addEventListener("click", (e) => {
                e.currentTarget.before(document.createElement("button-layer"));
            });
        }
        alts() {
            return [...this.querySelectorAll("button-layer")].map((alt) => alt.getData());
        }
    }
);

define(
    "app-root",
    class extends LightDOMElement {
        init() {
            this.querySelector(".add-layer").addEventListener("click", (e) => {
                e.preventDefault();
                e.currentTarget.parentElement.before(document.createElement("layers-row"));
            });
            this.querySelector("#submit").addEventListener("click", async (e) => {
                const win = window.open();
                win.document.write(`<h1 style="text-align:center;">Please wait...</h1>`);
                const pdf = await genPdf(this.layers());
                win.location = pdf.output("bloburi");
            });
        }
        layers() {
            return [...this.querySelectorAll("layers-row")].map((layer) => layer.alts());
        }
    }
);
