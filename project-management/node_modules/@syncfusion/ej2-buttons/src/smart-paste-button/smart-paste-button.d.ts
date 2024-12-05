/// <reference path="../button/button-model.d.ts" />
import { Button } from '../button/button';
import { SmartPasteButtonModel } from './smart-paste-button-model';
export interface ChatOptions {
    messages: {
        role: string;
        content: string;
    }[];
    temperature?: number;
    topP?: number;
    maxTokens?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    stop?: string[];
}
export declare class SmartPasteButton extends Button {
    /**
     * Callback function to get the form response data from the server to process the smart paste.
     *
     * @param {ChatOptions} settings - Specifies the chat options
     * @returns {string} - Returns the string
     */
    aiAssistHandler: Function;
    /**
     * Constructor for creating the widget
     *
     * @private
     * @param {SmartPasteButtonModel} options - Specifies Smart paste button model
     * @param {string | HTMLButtonElement} element - Specifies target element
     */
    constructor(options?: SmartPasteButtonModel, element?: string | HTMLButtonElement);
    protected wireEvents(): void;
    protected unWireEvents(): void;
    private smartPasteBtnClickHandler;
    private formatFields;
    private setFormFields;
    private findRadioButton;
    private triggerBeforeChange;
    private triggerAfterChange;
    private updateElementValue;
    private getFormFields;
    private isFieldIgnore;
    private getElementDescription;
    private getClipboardContent;
}
