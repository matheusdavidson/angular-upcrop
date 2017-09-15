import { Component, OnInit, Input, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularCropperjsComponent } from 'angular-cropperjs';

@Component({
    selector: 'app-upcrop-crop',
    template: `<div main-loading [fxHide]="!uploading"> <div class="spinner"></div></div><div [hidden]="uploading" class="upcrop-crop"> <h2 class="has-text-centered mat-subheading-2">Imagem{{currentNumber + 1}}de{{uploader?.queue?.length}}</h2> <div class="crop-image-container"> <angular-cropper #angularCropper *ngIf="current && current._dataUrl" [cropperOptions]="config" [imageUrl]="current?._dataUrl"></angular-cropper> </div><div class="crop-controls" fxLayout fxLayoutAlign="center center" fxLayoutWrap *ngIf="current && current._dataUrl"> <button md-button (click)="zoomIn()" class="md-icon-button" aria-label="Aumentar zoom" mdTooltip="Aumentar zoom"> <md-icon>zoom_in</md-icon> </button> <button md-button (click)="zoomOut()" class="md-icon-button" aria-label="Diminuir zoom" mdTooltip="Diminuir zoom"> <md-icon>zoom_out</md-icon> </button> <button md-button (click)="goLeft()" class="md-icon-button" aria-label="Mover para esquerda" mdTooltip="Mover para esquerda"> <md-icon>keyboard_arrow_left</md-icon> </button> <button md-button (click)="goRight()" class="md-icon-button" aria-label="Mover para direita" mdTooltip="Mover para direita"> <md-icon>keyboard_arrow_right</md-icon> </button> <button md-button (click)="goUp()" class="md-icon-button" aria-label="Mover para cima" mdTooltip="Mover para cima"> <md-icon>keyboard_arrow_up</md-icon> </button> <button md-button (click)="goDown()" class="md-icon-button" aria-label="Mover para baixo" mdTooltip="Mover para baixo"> <md-icon>keyboard_arrow_down</md-icon> </button> <button md-button (click)="rotateLeft()" class="md-icon-button" aria-label="Girar para esquerda" mdTooltip="Girar para esquerda"> <md-icon>rotate_left</md-icon> </button> <button md-button (click)="rotateRight()" class="md-icon-button" aria-label="Girar para direita" mdTooltip="Girar para direita"> <md-icon>rotate_right</md-icon> </button> <button md-button (click)="reset()" class="md-icon-button md-primary" aria-label="Restaurar imagem original" mdTooltip="Restaurar imagem original"> <md-icon>cached</md-icon> </button> </div></div>`,
    styles: ['.crop-image-container{max-height:500px;width:100%}.crop-image-container img{max-width:100%;max-height:100%}.crop-controls{padding-top:20px;padding-bottom:20px}[main-loading]{min-height:120px;padding-top:34px;box-sizing:border-box;flex-direction:column;max-width:100%;place-content:center;align-items:center;display:flex}.upcrop-crop .has-text-centered{text-align:center!important}']
})
export class UpcropCropComponent implements OnInit {

    @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;

    @Input()
    public config: any = {};

    @Input()
    public uploader: any = [];

    @Output()
    public onCropImage = new EventEmitter();

    public uploading: any = false;
    public current: any = false;
    public currentNumber: any = false;


    /*--------  Constructor  --------*/


    constructor() { }


    /*--------  Hooks  --------*/


    ngOnInit() {
    }


    /*--------  Controller  --------*/


    /**
     * Set cropping and everything to start crop
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

    zoomIn() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.zoom(0.1);
    }

    zoomOut() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.zoom(-0.1);
    }

    goLeft() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.move(-10, 0);
    }

    goRight() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.move(10, 0);
    }

    goUp() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.move(0, -10);
    }

    goDown() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.move(0, 10);
    }

    rotateLeft() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.rotate(-45);
    }

    rotateRight() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.rotate(45);
    }

    reset() {

        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper) return;

        // 
        // Action
        this.angularCropper.cropper.reset();
    }
}
