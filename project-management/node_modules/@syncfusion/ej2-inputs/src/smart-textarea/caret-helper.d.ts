export declare type CaretPosition = {
    left: number;
    top: number;
    height: number;
    pos?: number;
    elemStyle?: CSSStyleDeclaration;
};
export declare class CaretPositionHelper {
    private static properties;
    private static createStyledDiv;
    private static createCaretMarker;
    private static escapeHtml;
    static getCaretPosition(target: HTMLInputElement | HTMLTextAreaElement): CaretPosition;
    static adjustScrollToCaretPosition(element: HTMLInputElement | HTMLTextAreaElement): void;
    static getTextAreaPosition(element: HTMLInputElement | HTMLTextAreaElement): CaretPosition;
    static insertCharacter(element: HTMLInputElement | HTMLTextAreaElement, text: string): void;
}
