import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material";
import { UpcropDialogComponent } from './upcrop-dialog/upcrop-dialog.component';

@Injectable()
export class UpcropService {

    public dialogConfig: any = {
        width: '80%'
    };
    public uploadConfig: any = {
        url: null,
        authToken: null,
        autoUpload: false,
        additionalParameter: {},
        withCredentials: false
    };
    public cropConfig: any = {
        movable: true,
        scalable: true,
        zoomable: true,
        viewMode: 1,
        autoCrop: true,
        autoCropArea: 1
    };

    constructor(
        public dialog: MatDialog
    ) { }

    open(
        dialogConfig: any = this.dialogConfig,
        uploadConfig: any = this.uploadConfig,
        cropConfig: any = this.cropConfig
    ) {

        //
        // Merge config
        this.uploadConfig = Object.assign(this.uploadConfig, uploadConfig);
        this.cropConfig = Object.assign(this.cropConfig, cropConfig);
        this.dialogConfig = Object.assign({}, this.dialogConfig, dialogConfig, {
            data: {
                uploadConfig: this.uploadConfig,
                cropConfig: this.cropConfig
            }
        });

        //
        // Create promise to return the dialog result
        return new Promise((resolve, reject) => {

            //
            // Open confirmation dialog
            let dialogRef = this.dialog.open(UpcropDialogComponent, this.dialogConfig);

            //
            // Subscribe to on close event
            dialogRef.afterClosed().subscribe(result => {

                //
                // Validate result
                if (result) {
                    resolve(result);
                } else {
                    reject();
                }
            });
        });
    }
}
