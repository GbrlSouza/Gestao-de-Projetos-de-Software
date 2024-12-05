import { Column } from '../models/column';
import { IEditCell, IGrid } from '../base/interface';
import { EditCellBase } from './edit-cell-base';
import { Edit } from '../actions/edit';
/**
 * `DatePickerEditCell` is used to handle datepicker cell type editing.
 *
 * @hidden
 */
export declare class DatePickerEditCell extends EditCellBase implements IEditCell {
    edit: Edit;
    isMaskModuleInjected: boolean;
    constructor(parent?: IGrid);
    write(args: {
        rowData: Object;
        element: Element;
        column: Column;
        type: string;
        row: HTMLElement;
        requestType: string;
    }): void;
}
