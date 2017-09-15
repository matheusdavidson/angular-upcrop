import { OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { UpcropUploadComponent } from "../upcrop-upload/upcrop-upload.component";
import { UpcropCropComponent } from "../upcrop-crop/upcrop-crop.component";
export declare class UpcropDialogComponent implements OnInit {
    dialogRef: MdDialogRef<UpcropDialogComponent>;
    data: any;
    upcropUpload: UpcropUploadComponent;
    upcropCrop: UpcropCropComponent;
    cropData: {};
    uploadedImages: any[];
    uploader: any;
    steps: any;
    constructor(dialogRef: MdDialogRef<UpcropDialogComponent>, data: any);
    ngOnInit(): void;
    /**
     * Go to step 1
     */
    goToStep1(): void;
    /**
     * Go to step 2
     */
    goToStep2(): void;
    /**
     * Finish
     */
    finish(): void;
    /**
     * Step 1 next button disabled conditions
     */
    step1NextDisabled(): boolean;
    /**
     * On crop image event
     * @param event
     */
    onCropImage(event: any): void;
    /**
     * On upload image event
     * @param event
     */
    onUploadImage(event: any): void;
}
