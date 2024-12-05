import { IRichTextEditor } from '../base';
import { ServiceLocator } from '../services';
export declare class SlashMenu {
    private parent;
    private L10n;
    private mention;
    private savedSelection;
    private currentDocument;
    private defaultItems;
    private injectibleItems;
    constructor(options: IRichTextEditor, serviceLocator: ServiceLocator);
    private removeEventListener;
    private onPropertyChanged;
    getModuleName(): string;
    destroy(): void;
    private generateMentionModel;
    private handleSelect;
    private getItems;
    render(): void;
}
