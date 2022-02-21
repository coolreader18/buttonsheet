declare module "jspdf/src/jspdf" {
    export * from "jspdf";
}

declare module "jsx-svg:*" {
    import { ComponentType, JSX } from "preact";
    const SVG: ComponentType<JSX.SVGAttributes>;
    export default SVG;
}
