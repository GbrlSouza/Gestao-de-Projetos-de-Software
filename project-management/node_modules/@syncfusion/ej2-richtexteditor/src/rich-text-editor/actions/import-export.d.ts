import { IRichTextEditor } from '../base/interface';
/**
 * ImportExport module called when import and export content in RichTextEditor
 */
export declare class ImportExport {
    private rteID;
    private parent;
    private uploaderObj;
    constructor(parent?: IRichTextEditor);
    private addEventListener;
    private onImport;
    private onExport;
    private destroy;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    private getModuleName;
}
