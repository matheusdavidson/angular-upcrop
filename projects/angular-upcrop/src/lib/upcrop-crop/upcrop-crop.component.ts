import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';

@Component({
    selector: 'upcrop-crop',
    templateUrl: './upcrop-crop.component.html',
    styleUrls: ['./upcrop-crop.component.css']
})
export class UpcropCropComponent implements OnInit {

    @ViewChild('angularCropper') public angularCropper: CropperComponent;
    @Input() public config: any = {};
    @Input() public uploader: any = [];
    @Output() public onCropImage = new EventEmitter();

    public uploading: any = false;
    public current: any = false;
    public currentNumber: any = false;

    constructor() { }

    ngOnInit() {
    }

    /**
     * Set cropping
     * set cropping and everything to start crop
     * @param uploader
     */
    setCropping(uploader) {

        //
        // Disable cropping
        this.current = false;
        this.currentNumber = false;

        //
        // Set uploader
        this.uploader = uploader;

        //
        // Set queue for crop
        this.uploader.queue;

        //
        // Get next crop in the queue
        this.goToNextCrop();
    }

    /**
     * Unset cropping
     */
    unsetCropping() {
        this.angularCropper.cropper.destroy();
        this.current = false;
    }

    /**
     * Go to next crop
     */
    goToNextCrop() {

        //
        // Validate file
        if (!this.uploader.queue.length) return;

        //
        // Update counter and file
        if (this.currentNumber === false) {
            this.currentNumber = 0;
        } else {

            this.emitOnCropImage();

            //
            // Unset cropping
            this.unsetCropping();

            //
            // Update counter
            this.currentNumber++;
        }

        //
        // Get next crop in the queue
        this.current = this.uploader.queue[this.currentNumber];

        //
        // Set image data url
        let reader = new FileReader();

        //
        // Callback for reader.readAsDataUrl() below
        reader.onloadend = (e) => {

            //
            // Set _dataUrl
            this.current._dataUrl = reader.result;
        };

        //
        // Get data url
        reader.readAsDataURL(this.current._file);
    }

    /**
     * Emit on crop image
     */
    emitOnCropImage() {

        //
        // Add image data to current file
        this.onCropImage.emit({
            data: this.angularCropper.cropper.getData(),
            file: this.currentNumber
        });
    }

    /**
     * Zoom in
     */
    zoomIn() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.zoom(0.1);
    }

    /**
     * Zoom out
     */
    zoomOut() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.zoom(-0.1);
    }

    /**
     * Go left
     */
    goLeft() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.move(-10, 0);
    }

    /**
     * Go right
     */
    goRight() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.move(10, 0);
    }

    /**
     * Go up
     */
    goUp() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.move(0, -10);
    }

    /**
     * Go down
     */
    goDown() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.move(0, 10);
    }

    /**
     * Rotate left
     */
    rotateLeft() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.rotate(-45);
    }

    /**
     * Rotate right
     */
    rotateRight() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.rotate(45);
    }

    /**
     * Reset
     */
    reset() {

        //
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        //
        // Action
        this.angularCropper.cropper.reset();
    }
}
