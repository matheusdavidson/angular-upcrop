import { MdDialog } from "@angular/material";
export declare class UpcropService {
    dialog: MdDialog;
    dialogConfig: any;
    uploadConfig: any;
    cropConfig: any;
    constructor(dialog: MdDialog);
    /**
     * Open dialog with uplaod & crop
     * @param {object} dialogConfig
     * @param {object} uploadConfig
     * @param {object} cropConfig
     */
    open(dialogConfig?: any, uploadConfig?: any, cropConfig?: any): Promise<{}>;
}
