export type PDFPageProxy = import("./api").PDFPageProxy;
export type PageViewport = import("./display_utils").PageViewport;
export type IDownloadManager = any;
export type IPDFLinkService = import("../../web/interfaces").IPDFLinkService;
export type AnnotationElementParameters = {
    data: Object;
    layer: HTMLDivElement;
    page: PDFPageProxy;
    viewport: PageViewport;
    linkService: IPDFLinkService;
    downloadManager: any;
    annotationStorage?: AnnotationStorage | undefined;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    renderForms: boolean;
    svgFactory: Object;
    enableScripting?: boolean | undefined;
    hasJSActions?: boolean | undefined;
    fieldObjects?: Object | undefined;
    mouseState?: Object | undefined;
};
export type AnnotationLayerParameters = {
    viewport: PageViewport;
    div: HTMLDivElement;
    annotations: any[];
    page: PDFPageProxy;
    linkService: IPDFLinkService;
    downloadManager: any;
    /**
     * - Path for image resources, mainly
     * for annotation icons. Include trailing slash.
     */
    imageResourcesPath?: string | undefined;
    renderForms: boolean;
    /**
     * - Enable embedded script execution.
     */
    enableScripting?: boolean | undefined;
    /**
     * - Some fields have JS actions.
     * The default value is `false`.
     */
    hasJSActions?: boolean | undefined;
    annotationCanvasMap?: Map<string, HTMLCanvasElement> | undefined;
};
export class AnnotationElement {
    static get platform(): any;
    constructor(parameters: any, { isRenderable, ignoreBorder, createQuadrilaterals, }?: {
        isRenderable?: boolean | undefined;
        ignoreBorder?: boolean | undefined;
        createQuadrilaterals?: boolean | undefined;
    });
    isRenderable: boolean;
    data: any;
    layer: any;
    page: any;
    viewport: any;
    linkService: any;
    downloadManager: any;
    imageResourcesPath: any;
    renderForms: any;
    svgFactory: any;
    annotationStorage: any;
    enableScripting: any;
    hasJSActions: any;
    _fieldObjects: any;
    _mouseState: any;
    container: HTMLElement | undefined;
    quadrilaterals: HTMLElement[] | undefined;
    /**
     * Create an empty container for the annotation's HTML element.
     *
     * @private
     * @param {boolean} ignoreBorder
     * @memberof AnnotationElement
     * @returns {HTMLElement}
     */
    private _createContainer;
    /**
     * Create quadrilaterals from the annotation's quadpoints.
     *
     * @private
     * @param {boolean} ignoreBorder
     * @memberof AnnotationElement
     * @returns {Array<HTMLElement>}
     */
    private _createQuadrilaterals;
    /**
     * Create a popup for the annotation's HTML element. This is used for
     * annotations that do not have a Popup entry in the dictionary, but
     * are of a type that works with popups (such as Highlight annotations).
     *
     * @private
     * @param {HTMLDivElement|HTMLImageElement|null} trigger
     * @param {Object} data
     * @memberof AnnotationElement
     */
    private _createPopup;
    /**
     * Render the quadrilaterals of the annotation.
     *
     * @private
     * @param {string} className
     * @memberof AnnotationElement
     * @returns {Array<HTMLElement>}
     */
    private _renderQuadrilaterals;
    /**
     * Render the annotation's HTML element(s).
     *
     * @public
     * @memberof AnnotationElement
     * @returns {HTMLElement|Array<HTMLElement>}
     */
    public render(): HTMLElement | Array<HTMLElement>;
    /**
     * @private
     * @returns {Array}
     */
    private _getElementsByName;
}
/**
 * @typedef {Object} AnnotationLayerParameters
 * @property {PageViewport} viewport
 * @property {HTMLDivElement} div
 * @property {Array} annotations
 * @property {PDFPageProxy} page
 * @property {IPDFLinkService} linkService
 * @property {IDownloadManager} downloadManager
 * @property {string} [imageResourcesPath] - Path for image resources, mainly
 *   for annotation icons. Include trailing slash.
 * @property {boolean} renderForms
 * @property {boolean} [enableScripting] - Enable embedded script execution.
 * @property {boolean} [hasJSActions] - Some fields have JS actions.
 *   The default value is `false`.
 * @property {Map<string, HTMLCanvasElement>} [annotationCanvasMap]
 */
export class AnnotationLayer {
    /**
     * Render a new annotation layer with all annotation elements.
     *
     * @public
     * @param {AnnotationLayerParameters} parameters
     * @memberof AnnotationLayer
     */
    public static render(parameters: AnnotationLayerParameters): void;
    /**
     * Update the annotation elements on existing annotation layer.
     *
     * @public
     * @param {AnnotationLayerParameters} parameters
     * @memberof AnnotationLayer
     */
    public static update(parameters: AnnotationLayerParameters): void;
    static "__#3@#setAnnotationCanvasMap"(div: any, annotationCanvasMap: any): void;
}
import { AnnotationStorage } from "./annotation_storage.js";
