import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";
import { UpcropUploadComponent } from "../upcrop-upload/upcrop-upload.component";
import { UpcropCropComponent } from "../upcrop-crop/upcrop-crop.component";
import * as _ from 'lodash';

@Component({
    selector: 'app-upcrop-dialog',
    template: `<h2 md-dialog-title class="has-text-danger"> Upload de imagens <small>com corte</small></h2><md-dialog-content> <div steps> <div steps-content fxLayout="row" fxLayoutAlign="start center"> <button md-icon-button fxHide.xs [disabled]="!steps.current.previus || (steps.current.previusDisabled && steps.current.previusDisabled())" (click)="steps.current.previusAction()"> <md-icon>keyboard_arrow_left</md-icon> </button> <span fxFlex></span> <h3>Passo <b>{{steps.current.number}}</b> de <b>{{steps.total}}</b> / <span class="has-text-primary">{{steps.current.label}}</span> </h3> <span fxFlex></span> <button md-icon-button fxHide.xs [disabled]="!steps.current.next || (steps.current.nextDisabled && steps.current.nextDisabled())" (click)="steps.current.nextAction()"> <md-icon>keyboard_arrow_right</md-icon> </button> </div></div><div class="step-1" [hidden]="steps.current.number !=1"> <app-upcrop-upload #upcropUpload [config]="data.uploadConfig" (onUploadImage)="onUploadImage($event)"></app-upcrop-upload> </div><div class="step-2" [hidden]="steps.current.number !=2"> <app-upcrop-crop #upcropCrop [config]="data.cropConfig" (onCropImage)="onCropImage($event)"></app-upcrop-crop> </div></md-dialog-content><md-dialog-actions *ngIf="steps.current.number==1"> <button md-button md-dialog-close>Fechar</button> <button md-button color="primary" [disabled]="!upcropUpload.uploader.queue.length" (click)="goToStep2()">Continuar</button></md-dialog-actions><md-dialog-actions *ngIf="steps.current.number==2"> <button md-button (click)="goToStep1()">Voltar</button> <button md-button color="primary" [fxHide]="upcropCrop.uploader?.queue?.length==(upcropCrop.currentNumber + 1)" (click)="upcropCrop.goToNextCrop()">Próxima imagem</button> <button md-button color="primary" [fxHide]="upcropCrop.uploader?.queue?.length > (upcropCrop.currentNumber + 1)" [disabled]="upcropCrop.uploading" (click)="finish()">Concluir</button></md-dialog-actions>`,
    styles: ['[md-dialog-title] small{color:#b5b5b5!important;font:400 16px/28px Roboto,"Helvetica Neue",sans-serif!important;margin:0 0 16px!important}[steps]{margin:0 -24px 16px;padding-top:16px;padding-bottom:16px;background-color:rgba(0,0,0,.04)}[steps] .has-text-primary{color:#3f51b5!important}[md-dialog-title] .has-text-danger{color:#f44336!important}']
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


    /*--------  Constructor  --------*/


    constructor(
        public dialogRef: MdDialogRef<UpcropDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }


    /*--------  Hooks  --------*/


    ngOnInit() {

        // 
        // Set first step
        this.steps.current = this.steps.options[0];
    }


    /*--------  Controller  --------*/


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
        this.cropData[event.file] = event.data;
    }

    /**
     * On upload image event
     * @param event 
     */
    onUploadImage(event) {
        this.uploadedImages.push(event.file);
    }
}
