import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { UpcropUploadComponent } from '../upcrop-upload/upcrop-upload.component';
import { UpcropCropComponent } from '../upcrop-crop/upcrop-crop.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'upcrop-dialog',
    templateUrl: './upcrop-dialog.component.html',
    styleUrls: ['./upcrop-dialog.component.css']
})
export class UpcropDialogComponent implements OnInit {

    @ViewChild('upcropUpload') public upcropUpload: UpcropUploadComponent;
    @ViewChild('upcropCrop') public upcropCrop: UpcropCropComponent;

    public cropData = {};
    public uploadedImages = [];
    public uploader: any = null;
    public steps: any = {
        total: 2,
        options: [{
            label: 'Subir imagens',
            number: 1,
            next: 2,
            nextDisabled: () => { return this.step1NextDisabled(); },
            nextAction: () => { this.goToStep2(); }
        }, {
            label: 'Cortar imagens',
            number: 2,
            previus: 1,
            previusAction: () => { this.goToStep1(); }
        }],
        current: {}
    };

    constructor(
        public dialogRef: MatDialogRef<UpcropDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {

        //
        // Set first step
        this.steps.current = this.steps.options[0];
    }

    /**
     * Go to step 1
     */
    goToStep1() {

        //
        // Reset crop
        this.upcropCrop.unsetCropping();

        //
        // Change to step 1
        this.steps.current = this.steps.options[0];

        //
        // Reset crop
        this.upcropCrop.current = false;
        this.upcropCrop.currentNumber = false;
    }

    /**
     * Go to step 2
     */
    goToStep2() {

        //
        // Change to step 2
        this.steps.current = this.steps.options[1];

        //
        // Set crop
        this.upcropCrop.setCropping(this.upcropUpload.uploader);
    }

    /**
     * Finish
     */
    finish() {

        //
        // On complete all files uplaod
        this.upcropUpload.uploader.onCompleteAll = () => {

            //
            // Remove loading
            this.upcropCrop.uploading = false;

            //
            // Close dialog with uploadedImages
            this.dialogRef.close(this.uploadedImages);
        }

        //
        // Emit on crop image
        this.upcropCrop.emitOnCropImage();

        //
        // Set crop data in additionalParameter
        this.upcropUpload.uploader.options.additionalParameter['cropData'] = this.cropData;

        //
        // Upload all
        this.upcropCrop.uploading = true;
        this.upcropUpload.uploader.uploadAll();
    }

    /**
     * Step 1 next button disabled conditions
     */
    step1NextDisabled() {
        return !this.upcropUpload.uploader.queue.length;
    }

    /**
     * On crop image event
     * @param event
     */
    onCropImage(event) {

        //
        // Create url params with crop data
        const cropData = this.createUrlParams(event.data);

        //
        // Add crop to uploader file crop data
        this.upcropUpload.uploader.queue[event.file].url = this.data.uploadConfig.url + cropData;
    }

    /**
     * On upload image event
     * @param event
     */
    onUploadImage(event) {
        this.uploadedImages.push(event.image);
    }

    /**
     * Create url params
     * @param obj
     */
    createUrlParams(obj) {

        //
        // Validate obj
        if (!obj) return '';

        //
        // First param
        const url = '?';

        //
        // Generate url param
        const params = Object.keys(obj).map(function (key) {
            return key + '=' + encodeURIComponent(obj[key]);
        }).join('&');

        return url + params;
    }
}
