/// <reference path="../textarea/textarea-model.d.ts" />
import { TextArea } from '../textarea/textarea';
import { SmartTextAreaModel } from './smart-textarea-model';
export interface ChatParameters {
    messages: ChatMessage[];
    temperature?: number;
    maxTokens?: number;
    stopSequences: string[];
    frequencyPenalty?: number;
    presencePenalty?: number;
}
export declare enum ChatMessageRole {
    System = "system",
    User = "user",
    Assistant = "assistant"
}
export interface ChatMessage {
    role: ChatMessageRole;
    content: string;
}
export declare type SuggestionMode = 'Enable' | 'Disable' | 'None';
export declare class SmartTextArea extends TextArea {
    private pendingSuggestionAbort;
    /**
     * Represents the user's role or designation, which can be used to provide role-specific suggestions or content within the smart textarea.
     * Provide a string that describes who is typing and for what reason, optionally giving other contextual information.
     *
     * @default ''
     */
    userRole: string;
    /**
     * Specifies a collection of phrases commonly used by the user, which can be leveraged for auto-completion and suggestions.
     * Provide an array of string phrases commonly used by the user to enhance auto-completion and suggestions. Include preferred tone, voice, and any relevant information such as policies, URLs, or keywords for improved suggestions.
     *
     * @default []
     */
    UserPhrases: string[];
    /**
     * Callback function to get suggestion text from server to display smart suggestion.
     *
     * @returns {string}
     */
    aiSuggestionHandler: Function;
    /**
     * Specifies whether suggestions should appear in a popup or inline within the text area.
     * possible values are:
     * * `Enable` - Suggestions are always shown as a floating overlay, which can be tapped or clicked.
     * * `Disable` - Suggestions are always shown inline and can be accepted by pressing `Tab` key.
     * * `None` - Touch devices display suggestions as an overlay, while non-touch devices use inline suggestions.
     *
     * @default None
     */
    showSuggestionOnPopup: SuggestionMode;
    /**
     * Constructor for creating the widget
     *
     * @private
     * @param {SmartTextArea} options - Specifies Smart text area model
     * @param {string | HTMLTextAreaElement} element - Specifies target element
     */
    constructor(options?: SmartTextAreaModel, element?: string | HTMLTextAreaElement);
    private textArea;
    private suggestionDisplay;
    private typingDebounceTimeout;
    render(): void;
    protected wireEvents(): void;
    protected unWireEvents(): void;
    protected keydownHandler(): void;
    private shouldShowInlineSuggestions;
    private handleKeyDown;
    private handleKeyUp;
    private handleTypingPaused;
    private removeExistingOrPendingSuggestion;
    private createSuggestionPrompt;
    private requestSuggestionAsync;
    private validateSuggestion;
    private indexOfAny;
    getModuleName(): string;
    destroy(): void;
}
