import { MatDialog } from "@angular/material";
export declare class UpcropService {
    dialog: MatDialog;
    dialogConfig: any;
    uploadConfig: any;
    cropConfig: any;
    constructor(dialog: MatDialog);
    /**
     * Open dialog with uplaod & crop
     * @param {object} dialogConfig
     * @param {object} uploadConfig
     * @param {object} cropConfig
     */
    open(dialogConfig?: any, uploadConfig?: any, cropConfig?: any): Promise<{}>;
}
