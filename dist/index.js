import { Component, Directive, ElementRef, EventEmitter, Inject, Injectable, Input, NgModule, Output, Renderer, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule, FileUploader } from 'ng2-file-upload/index';
import { MD_DIALOG_DATA, MdButtonModule, MdCardModule, MdDialog, MdDialogModule, MdDialogRef, MdIconModule, MdTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularCropperjsModule } from 'angular-cropperjs';

var UpcropUploadComponent = (function () {
    function UpcropUploadComponent() {
        this.config = {};
        this.uploadQueue = [];
        this.onUploadQueue = new EventEmitter();
        this.onUploadImage = new EventEmitter();
        this.uploader = new FileUploader({});
        this.hasFileOver = false;
    }
    /**
     * @return {?}
     */
    UpcropUploadComponent.prototype.ngOnInit = function () {
        // 
        // Set uploader
        this.setUploader();
    };
    /**
     * Set uploader
     * @return {?}
     */
    UpcropUploadComponent.prototype.setUploader = function () {
        var _this = this;
        //
        // Context for uploader 
        this.uploader.setOptions({ url: this.config.url, authToken: this.config.authToken, autoUpload: this.config.autoUpload, additionalParameter: this.config.additionalParameter });
        this.uploader.onAfterAddingFile = function (file) {
            // 
            // Set with credentials
            file.withCredentials = _this.config.withCredentials;
            // 
            // Emit onUploadQueue
            _this.onUploadQueue.emit({
                file: file
            });
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            if (status == 200) {
                // 
                // Parse response
                var /** @type {?} */ data = JSON.parse(response);
                // 
                // Emit onUploadQueue
                _this.onUploadImage.emit({
                    image: data.image
                });
            }
            else {
            }
        };
    };
    /**
     * On file over event
     * @param {?} e
     * @return {?}
     */
    UpcropUploadComponent.prototype.onFileOver = function (e) {
        this.hasFileOver = e;
    };
    /**
     * Truncate filename
     * @param {?} n
     * @param {?} len
     * @return {?}
     */
    UpcropUploadComponent.prototype.truncate = function (n, len) {
        // 
        // Validate
        if (!n)
            return n;
        var /** @type {?} */ ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
        var /** @type {?} */ filename = n.replace('.' + ext, '');
        if (filename.length <= len) {
            return n;
        }
        filename = filename.substr(0, len) + (n.length > len ? '[...]' : '');
        return filename + '.' + ext;
    };
    return UpcropUploadComponent;
}());
UpcropUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-upcrop-upload',
                template: "<label ng2FileDrop multiple class=\"my-drop-zone\" [ngClass]=\"{'nv-file-over': hasFileOver}\" (fileOver)=\"onFileOver($event)\" [uploader]=\"uploader\" fxLayout fxLayoutAlign=\"center center\"> \u00C1rea de upload <input type=\"file\" ng2FileSelect multiple [uploader]=\"uploader\" style=\"display: none\"/></label><table class=\"table upcrop-upload-table\"> <thead> <tr> <th>Preview</th> <th>Arquivo</th> <th> <md-icon class=\"is-pulled-right\">settings</md-icon> </th> </tr></thead> <tbody> <tr *ngFor=\"let item of uploader.queue\"> <td style=\"width:120px\"> <img upcropImagePreview [image]=\"item?._file\" class=\"media-object\"/> </td><td>{{truncate(item?.file?.name, 16)}}</td><td class=\"actions\" style=\"width:53px\"> <a class=\"button is-small is-danger is-outlined\" (click)=\"item.remove()\"> <span class=\"icon is-small\"> <i class=\"fa fa-trash\"></i> </span> </a> </td></tr><tr [hidden]=\"uploader.queue.length\"> <td colspan=\"3\" class=\"has-text-danger\"> Nenhum arquivo, adicione acima. </td></tr></tbody></table>",
                styles: ['.my-drop-zone{border:2px dashed rgba(0,0,0,.04);width:100%;display:flex;padding:20px;background-color:rgba(0,0,0,.04);color:rgba(0,0,0,.7)}.nv-file-over{border:2px dashed rgba(244,67,54,.4)}[upcropImagePreview]{display:block}.upcrop-upload-table{background-color:#fff;color:#363636}.upcrop-upload-table td,.upcrop-upload-table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.upcrop-upload-table td.is-white,.upcrop-upload-table th.is-white{background-color:#fff;border-color:#fff;color:#0a0a0a}.upcrop-upload-table td.is-black,.upcrop-upload-table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.upcrop-upload-table td.is-light,.upcrop-upload-table th.is-light{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.upcrop-upload-table td.is-dark,.upcrop-upload-table th.is-dark{background-color:#363636;border-color:#363636;color:#f5f5f5}.upcrop-upload-table td.is-primary,.upcrop-upload-table th.is-primary{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.upcrop-upload-table td.is-info,.upcrop-upload-table th.is-info{background-color:#3273dc;border-color:#3273dc;color:#fff}.upcrop-upload-table td.is-success,.upcrop-upload-table th.is-success{background-color:#23d160;border-color:#23d160;color:#fff}.upcrop-upload-table td.is-warning,.upcrop-upload-table th.is-warning{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.upcrop-upload-table td.is-danger,.upcrop-upload-table th.is-danger{background-color:#ff3860;border-color:#ff3860;color:#fff}.upcrop-upload-table td.is-narrow,.upcrop-upload-table th.is-narrow{white-space:nowrap;width:1%}.upcrop-upload-table th{color:#363636;text-align:left}.upcrop-upload-table tr:hover{background-color:#fafafa}.upcrop-upload-table tr.is-selected{background-color:#00d1b2;color:#fff}.upcrop-upload-table tr.is-selected a,.upcrop-upload-table tr.is-selected strong{color:currentColor}.upcrop-upload-table tr.is-selected td,.upcrop-upload-table tr.is-selected th{border-color:#fff;color:currentColor}.upcrop-upload-table thead td,.upcrop-upload-table thead th{color:#363636}.upcrop-upload-table tfoot td,.upcrop-upload-table tfoot th{border-width:2px 0 0;color:#363636}.upcrop-upload-table tbody tr:last-child td,.upcrop-upload-table tbody tr:last-child th{border-bottom-width:0}.upcrop-upload-table.is-bordered td,.upcrop-upload-table.is-bordered th{border-width:1px}.upcrop-upload-table.is-bordered tr:last-child td,.upcrop-upload-table.is-bordered tr:last-child th{border-bottom-width:1px}.upcrop-upload-table.is-fullwidth{width:100%}.upcrop-upload-table.is-narrow td,.upcrop-upload-table.is-narrow th{padding:.25em .5em}.upcrop-upload-table.is-striped tbody tr:not(.is-selected):nth-child(even){background-color:#fafafa}.upcrop-upload-table.is-striped tbody tr:not(.is-selected):nth-child(even):hover{background-color:#f5f5f5}td,th{padding:0;text-align:left}.upcrop-upload-table-search{display:flex;padding:1.3em 1.6em}.upcrop-upload-table-search input{font-size:14px;flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1;border:none;background-color:transparent;outline:-webkit-focus-ring-color auto 0!important}.upcrop-upload-table-search>md-icon{margin-right:16px;margin-top:2px}[table-loading]{position:absolute;width:100%;margin-top:59px!important;background-color:rgba(255,255,255,.9);height:calc(100% - 59px);z-index:1}[table-no-entries]{padding:1.6em}.mat-card[has-table]{padding:0}.mat-card[has-table] .mat-card-actions{padding:8px!important;margin:0;border-top:1px solid #dbdbdb;border-color:rgba(0,0,0,.09)}.mat-card[has-table] .mat-card-actions .mat-icon-button{color:rgba(0,0,0,.54)}.mat-card[has-table] .mat-card-actions .mat-icon-button[disabled]{color:rgba(0,0,0,.18)}.mat-card[has-table] .mat-card-actions .mat-paginator-page-size-label{margin:0 15px;color:rgba(0,0,0,.54);font-size:12px;font-weight:400}.upcrop-upload-table{border-collapse:collapse;border-spacing:0;width:100%;margin-bottom:0}.upcrop-upload-table .actions .button{margin-bottom:-.25em;margin-top:-.15em}.upcrop-upload-table thead tr{background-color:rgba(0,0,0,.04)!important}.upcrop-upload-table thead td:first-of-type,.upcrop-upload-table thead th:first-of-type{padding-left:1.8em}.upcrop-upload-table thead td:last-of-type,.upcrop-upload-table thead th:last-of-type{padding-right:1.8em}.upcrop-upload-table thead td md-icon,.upcrop-upload-table thead th md-icon{height:16px;width:16px;line-height:16px;font-size:16px;vertical-align:bottom;margin-right:3px}.upcrop-upload-table tbody td,.upcrop-upload-table tbody th{border-color:rgba(0,0,0,.04)}.upcrop-upload-table tbody td:first-of-type,.upcrop-upload-table tbody th:first-of-type{padding-left:1.6em}.upcrop-upload-table tbody td:last-of-type,.upcrop-upload-table tbody th:last-of-type{padding-right:1.6em}.upcrop-upload-table thead td,.upcrop-upload-table thead th{color:rgba(0,0,0,.54);font-size:12px;font-weight:400;padding:1.3em .75em;border:none;border-width:0}.upcrop-upload-table tbody td{color:rgba(0,0,0,.87);padding:1em .75em;font-size:.9rem;font-weight:400}@media (max-width:800px){.upcrop-upload-table{vertical-align:top;max-width:100%;overflow-x:auto;white-space:nowrap;border-collapse:collapse;border-spacing:0;display:flex;overflow:hidden;background:0 0}.upcrop-upload-table .actions a{margin-top:-.35em}.upcrop-upload-table .is-pulled-right{float:none!important}.upcrop-upload-table thead{display:flex;flex-shrink:0;min-width:min-content}.upcrop-upload-table thead td,.upcrop-upload-table thead th{padding:1.3em 1.8em;text-align:right;width:100%!important}.upcrop-upload-table thead td md-icon,.upcrop-upload-table thead th md-icon{margin-right:0}.upcrop-upload-table tbody{flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1;-webkit-overflow-scrolling:touch;background:radial-gradient(left,ellipse,rgba(0,0,0,.2) 0,transparent 75%) 0 center,radial-gradient(right,ellipse,rgba(0,0,0,.2) 0,transparent 75%) 100% center;background-size:10px 100%,10px 100%;background-attachment:scroll,scroll;background-repeat:no-repeat;display:flex;position:relative;overflow-x:auto;overflow-y:hidden;margin-right:1.6em}.upcrop-upload-table tbody tr{flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1}.upcrop-upload-table tbody td,.upcrop-upload-table tbody th{padding:1.155em 1.6em;text-align:left!important}.upcrop-upload-table tbody td:first-of-type,.upcrop-upload-table tbody th:first-of-type{padding-left:1.6em}.upcrop-upload-table tbody td:last-of-type,.upcrop-upload-table tbody th:last-of-type{padding-right:1.6em}.upcrop-upload-table tr{display:flex;flex-direction:column;min-width:min-content;flex-shrink:0}.upcrop-upload-table td,.upcrop-upload-table th{display:block;background-image:none!important;border-left:0}.upcrop-upload-table td:first-child,.upcrop-upload-table th:first-child{background-image:linear-gradient(to right,#fff 50%,rgba(255,255,255,0) 100%);background-repeat:no-repeat;background-size:20px 100%}.upcrop-upload-table td:last-child,.upcrop-upload-table th:last-child{background-image:linear-gradient(to left,#fff 50%,rgba(255,255,255,0) 100%);background-repeat:no-repeat;background-position:100% 0;background-size:20px 100%}.upcrop-upload-table td:not(:last-child),.upcrop-upload-table th:not(:last-child){border-bottom:0}}.upcrop-upload-table ::-webkit-scrollbar{height:8px;overflow:visible;width:16px}.upcrop-upload-table ::-webkit-scrollbar-button{height:0;width:0}.upcrop-upload-table ::-webkit-scrollbar-corner{background:0 0}.upcrop-upload-table ::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.2);background-clip:padding-box;border:solid transparent;border-width:1px 1px 1px 6px;min-height:28px;padding:100px 0 0;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1),inset 0 -1px 0 rgba(0,0,0,.07);box-shadow:inset 1px 1px 0 rgba(0,0,0,.1),inset 0 -1px 0 rgba(0,0,0,.07)}.upcrop-upload-table ::-webkit-scrollbar-track{background-clip:padding-box;border:solid transparent;border-width:0 0 0 4px}[enterlist] [has-table]{margin-right:-24px;margin-left:-24px}[enterlist] [has-table] .upcrop-upload-table{background-color:transparent}[enterlist] [has-table] .upcrop-upload-table thead tr{background-color:rgba(0,0,0,.02)!important}[enterlist] [has-table] .upcrop-upload-table tr:hover{background-color:inherit}']
            },] },
];
/**
 * @nocollapse
 */
UpcropUploadComponent.ctorParameters = function () { return []; };
UpcropUploadComponent.propDecorators = {
    'config': [{ type: Input },],
    'uploadQueue': [{ type: Input },],
    'onUploadQueue': [{ type: Output },],
    'onUploadImage': [{ type: Output },],
};

var UpcropUploadInstaComponent = (function () {
    function UpcropUploadInstaComponent() {
        this.config = {};
        this.uploadQueue = [];
        this.onUploadQueue = new EventEmitter();
        this.onUploadImage = new EventEmitter();
    }
    /**
     * @return {?}
     */
    UpcropUploadInstaComponent.prototype.ngOnInit = function () {
    };
    return UpcropUploadInstaComponent;
}());
/*--------  Methods  --------*/
UpcropUploadInstaComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-upcrop-upload-insta',
                // template: `<label ng2FileDrop multiple class="my-drop-zone" [ngClass]="{'nv-file-over': hasFileOver}" (fileOver)="onFileOver($event)" [uploader]="uploader" fxLayout fxLayoutAlign="center center"> Área de upload <input type="file" ng2FileSelect multiple [uploader]="uploader" style="display: none"/></label><table class="table upcrop-upload-table"> <thead> <tr> <th>Preview</th> <th>Arquivo</th> <th> <md-icon class="is-pulled-right">settings</md-icon> </th> </tr></thead> <tbody> <tr *ngFor="let item of uploader.queue"> <td style="width:120px"> <img upcropImagePreview [image]="item?._file" class="media-object"/> </td><td>{{truncate(item?.file?.name, 16)}}</td><td class="actions" style="width:53px"> <a class="button is-small is-danger is-outlined" (click)="item.remove()"> <span class="icon is-small"> <i class="fa fa-trash"></i> </span> </a> </td></tr><tr [hidden]="uploader.queue.length"> <td colspan="3" class="has-text-danger"> Nenhum arquivo, adicione acima. </td></tr></tbody></table>`,
                // styles: ['.my-drop-zone{border:2px dashed rgba(0,0,0,.04);width:100%;display:flex;padding:20px;background-color:rgba(0,0,0,.04);color:rgba(0,0,0,.7)}.nv-file-over{border:2px dashed rgba(244,67,54,.4)}[upcropImagePreview]{display:block}.upcrop-upload-table{background-color:#fff;color:#363636}.upcrop-upload-table td,.upcrop-upload-table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.upcrop-upload-table td.is-white,.upcrop-upload-table th.is-white{background-color:#fff;border-color:#fff;color:#0a0a0a}.upcrop-upload-table td.is-black,.upcrop-upload-table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.upcrop-upload-table td.is-light,.upcrop-upload-table th.is-light{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.upcrop-upload-table td.is-dark,.upcrop-upload-table th.is-dark{background-color:#363636;border-color:#363636;color:#f5f5f5}.upcrop-upload-table td.is-primary,.upcrop-upload-table th.is-primary{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.upcrop-upload-table td.is-info,.upcrop-upload-table th.is-info{background-color:#3273dc;border-color:#3273dc;color:#fff}.upcrop-upload-table td.is-success,.upcrop-upload-table th.is-success{background-color:#23d160;border-color:#23d160;color:#fff}.upcrop-upload-table td.is-warning,.upcrop-upload-table th.is-warning{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.upcrop-upload-table td.is-danger,.upcrop-upload-table th.is-danger{background-color:#ff3860;border-color:#ff3860;color:#fff}.upcrop-upload-table td.is-narrow,.upcrop-upload-table th.is-narrow{white-space:nowrap;width:1%}.upcrop-upload-table th{color:#363636;text-align:left}.upcrop-upload-table tr:hover{background-color:#fafafa}.upcrop-upload-table tr.is-selected{background-color:#00d1b2;color:#fff}.upcrop-upload-table tr.is-selected a,.upcrop-upload-table tr.is-selected strong{color:currentColor}.upcrop-upload-table tr.is-selected td,.upcrop-upload-table tr.is-selected th{border-color:#fff;color:currentColor}.upcrop-upload-table thead td,.upcrop-upload-table thead th{color:#363636}.upcrop-upload-table tfoot td,.upcrop-upload-table tfoot th{border-width:2px 0 0;color:#363636}.upcrop-upload-table tbody tr:last-child td,.upcrop-upload-table tbody tr:last-child th{border-bottom-width:0}.upcrop-upload-table.is-bordered td,.upcrop-upload-table.is-bordered th{border-width:1px}.upcrop-upload-table.is-bordered tr:last-child td,.upcrop-upload-table.is-bordered tr:last-child th{border-bottom-width:1px}.upcrop-upload-table.is-fullwidth{width:100%}.upcrop-upload-table.is-narrow td,.upcrop-upload-table.is-narrow th{padding:.25em .5em}.upcrop-upload-table.is-striped tbody tr:not(.is-selected):nth-child(even){background-color:#fafafa}.upcrop-upload-table.is-striped tbody tr:not(.is-selected):nth-child(even):hover{background-color:#f5f5f5}td,th{padding:0;text-align:left}.upcrop-upload-table-search{display:flex;padding:1.3em 1.6em}.upcrop-upload-table-search input{font-size:14px;flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1;border:none;background-color:transparent;outline:-webkit-focus-ring-color auto 0!important}.upcrop-upload-table-search>md-icon{margin-right:16px;margin-top:2px}[table-loading]{position:absolute;width:100%;margin-top:59px!important;background-color:rgba(255,255,255,.9);height:calc(100% - 59px);z-index:1}[table-no-entries]{padding:1.6em}.mat-card[has-table]{padding:0}.mat-card[has-table] .mat-card-actions{padding:8px!important;margin:0;border-top:1px solid #dbdbdb;border-color:rgba(0,0,0,.09)}.mat-card[has-table] .mat-card-actions .mat-icon-button{color:rgba(0,0,0,.54)}.mat-card[has-table] .mat-card-actions .mat-icon-button[disabled]{color:rgba(0,0,0,.18)}.mat-card[has-table] .mat-card-actions .mat-paginator-page-size-label{margin:0 15px;color:rgba(0,0,0,.54);font-size:12px;font-weight:400}.upcrop-upload-table{border-collapse:collapse;border-spacing:0;width:100%;margin-bottom:0}.upcrop-upload-table .actions .button{margin-bottom:-.25em;margin-top:-.15em}.upcrop-upload-table thead tr{background-color:rgba(0,0,0,.04)!important}.upcrop-upload-table thead td:first-of-type,.upcrop-upload-table thead th:first-of-type{padding-left:1.8em}.upcrop-upload-table thead td:last-of-type,.upcrop-upload-table thead th:last-of-type{padding-right:1.8em}.upcrop-upload-table thead td md-icon,.upcrop-upload-table thead th md-icon{height:16px;width:16px;line-height:16px;font-size:16px;vertical-align:bottom;margin-right:3px}.upcrop-upload-table tbody td,.upcrop-upload-table tbody th{border-color:rgba(0,0,0,.04)}.upcrop-upload-table tbody td:first-of-type,.upcrop-upload-table tbody th:first-of-type{padding-left:1.6em}.upcrop-upload-table tbody td:last-of-type,.upcrop-upload-table tbody th:last-of-type{padding-right:1.6em}.upcrop-upload-table thead td,.upcrop-upload-table thead th{color:rgba(0,0,0,.54);font-size:12px;font-weight:400;padding:1.3em .75em;border:none;border-width:0}.upcrop-upload-table tbody td{color:rgba(0,0,0,.87);padding:1em .75em;font-size:.9rem;font-weight:400}@media (max-width:800px){.upcrop-upload-table{vertical-align:top;max-width:100%;overflow-x:auto;white-space:nowrap;border-collapse:collapse;border-spacing:0;display:flex;overflow:hidden;background:0 0}.upcrop-upload-table .actions a{margin-top:-.35em}.upcrop-upload-table .is-pulled-right{float:none!important}.upcrop-upload-table thead{display:flex;flex-shrink:0;min-width:min-content}.upcrop-upload-table thead td,.upcrop-upload-table thead th{padding:1.3em 1.8em;text-align:right;width:100%!important}.upcrop-upload-table thead td md-icon,.upcrop-upload-table thead th md-icon{margin-right:0}.upcrop-upload-table tbody{flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1;-webkit-overflow-scrolling:touch;background:radial-gradient(left,ellipse,rgba(0,0,0,.2) 0,transparent 75%) 0 center,radial-gradient(right,ellipse,rgba(0,0,0,.2) 0,transparent 75%) 100% center;background-size:10px 100%,10px 100%;background-attachment:scroll,scroll;background-repeat:no-repeat;display:flex;position:relative;overflow-x:auto;overflow-y:hidden;margin-right:1.6em}.upcrop-upload-table tbody tr{flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1}.upcrop-upload-table tbody td,.upcrop-upload-table tbody th{padding:1.155em 1.6em;text-align:left!important}.upcrop-upload-table tbody td:first-of-type,.upcrop-upload-table tbody th:first-of-type{padding-left:1.6em}.upcrop-upload-table tbody td:last-of-type,.upcrop-upload-table tbody th:last-of-type{padding-right:1.6em}.upcrop-upload-table tr{display:flex;flex-direction:column;min-width:min-content;flex-shrink:0}.upcrop-upload-table td,.upcrop-upload-table th{display:block;background-image:none!important;border-left:0}.upcrop-upload-table td:first-child,.upcrop-upload-table th:first-child{background-image:linear-gradient(to right,#fff 50%,rgba(255,255,255,0) 100%);background-repeat:no-repeat;background-size:20px 100%}.upcrop-upload-table td:last-child,.upcrop-upload-table th:last-child{background-image:linear-gradient(to left,#fff 50%,rgba(255,255,255,0) 100%);background-repeat:no-repeat;background-position:100% 0;background-size:20px 100%}.upcrop-upload-table td:not(:last-child),.upcrop-upload-table th:not(:last-child){border-bottom:0}}.upcrop-upload-table ::-webkit-scrollbar{height:8px;overflow:visible;width:16px}.upcrop-upload-table ::-webkit-scrollbar-button{height:0;width:0}.upcrop-upload-table ::-webkit-scrollbar-corner{background:0 0}.upcrop-upload-table ::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.2);background-clip:padding-box;border:solid transparent;border-width:1px 1px 1px 6px;min-height:28px;padding:100px 0 0;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1),inset 0 -1px 0 rgba(0,0,0,.07);box-shadow:inset 1px 1px 0 rgba(0,0,0,.1),inset 0 -1px 0 rgba(0,0,0,.07)}.upcrop-upload-table ::-webkit-scrollbar-track{background-clip:padding-box;border:solid transparent;border-width:0 0 0 4px}[enterlist] [has-table]{margin-right:-24px;margin-left:-24px}[enterlist] [has-table] .upcrop-upload-table{background-color:transparent}[enterlist] [has-table] .upcrop-upload-table thead tr{background-color:rgba(0,0,0,.02)!important}[enterlist] [has-table] .upcrop-upload-table tr:hover{background-color:inherit}']
                templateUrl: './mount-upload-insta.component.html',
                styleUrls: ['./mount-upload-insta.component.css']
            },] },
];
/**
 * @nocollapse
 */
UpcropUploadInstaComponent.ctorParameters = function () { return []; };
UpcropUploadInstaComponent.propDecorators = {
    'config': [{ type: Input },],
    'uploadQueue': [{ type: Input },],
    'onUploadQueue': [{ type: Output },],
    'onUploadImage': [{ type: Output },],
};

var UpcropCropComponent = (function () {
    function UpcropCropComponent() {
        this.config = {};
        this.uploader = [];
        this.onCropImage = new EventEmitter();
        this.uploading = false;
        this.current = false;
        this.currentNumber = false;
    }
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.ngOnInit = function () {
    };
    /**
     * Set cropping and everything to start crop
     * @param {?} uploader
     * @return {?}
     */
    UpcropCropComponent.prototype.setCropping = function (uploader) {
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
    };
    /**
     * Unset cropping
     * @return {?}
     */
    UpcropCropComponent.prototype.unsetCropping = function () {
        this.angularCropper.cropper.destroy();
        this.current = false;
    };
    /**
     * Go to next crop
     * @return {?}
     */
    UpcropCropComponent.prototype.goToNextCrop = function () {
        var _this = this;
        // 
        // Validate file
        if (!this.uploader.queue.length)
            return;
        // 
        // Update counter and file
        if (this.currentNumber === false) {
            this.currentNumber = 0;
        }
        else {
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
        var /** @type {?} */ reader = new FileReader();
        // 
        // Callback for reader.readAsDataUrl() below
        reader.onloadend = function (e) {
            // 
            // Set _dataUrl
            _this.current._dataUrl = reader.result;
        };
        // 
        // Get data url
        reader.readAsDataURL(this.current._file);
    };
    /**
     * Emit on crop image
     * @return {?}
     */
    UpcropCropComponent.prototype.emitOnCropImage = function () {
        // 
        // Add image data to current file
        this.onCropImage.emit({
            data: this.angularCropper.cropper.getData(),
            file: this.currentNumber
        });
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.zoomIn = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.zoom(0.1);
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.zoomOut = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.zoom(-0.1);
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.goLeft = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.move(-10, 0);
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.goRight = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.move(10, 0);
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.goUp = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.move(0, -10);
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.goDown = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.move(0, 10);
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.rotateLeft = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.rotate(-45);
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.rotateRight = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.rotate(45);
    };
    /**
     * @return {?}
     */
    UpcropCropComponent.prototype.reset = function () {
        // 
        // Validate
        if (!this.angularCropper || !this.angularCropper.cropper)
            return;
        // 
        // Action
        this.angularCropper.cropper.reset();
    };
    return UpcropCropComponent;
}());
UpcropCropComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-upcrop-crop',
                template: "<div main-loading [fxHide]=\"!uploading\"> <div class=\"spinner\"></div></div><div [hidden]=\"uploading\" class=\"upcrop-crop\"> <h2 class=\"has-text-centered mat-subheading-2\">Imagem{{currentNumber + 1}}de{{uploader?.queue?.length}}</h2> <div class=\"crop-image-container\"> <angular-cropper #angularCropper *ngIf=\"current && current._dataUrl\" [cropperOptions]=\"config\" [imageUrl]=\"current?._dataUrl\"></angular-cropper> </div><div class=\"crop-controls\" fxLayout fxLayoutAlign=\"center center\" fxLayoutWrap *ngIf=\"current && current._dataUrl\"> <button md-button (click)=\"zoomIn()\" class=\"md-icon-button\" aria-label=\"Aumentar zoom\" mdTooltip=\"Aumentar zoom\"> <md-icon>zoom_in</md-icon> </button> <button md-button (click)=\"zoomOut()\" class=\"md-icon-button\" aria-label=\"Diminuir zoom\" mdTooltip=\"Diminuir zoom\"> <md-icon>zoom_out</md-icon> </button> <button md-button (click)=\"goLeft()\" class=\"md-icon-button\" aria-label=\"Mover para esquerda\" mdTooltip=\"Mover para esquerda\"> <md-icon>keyboard_arrow_left</md-icon> </button> <button md-button (click)=\"goRight()\" class=\"md-icon-button\" aria-label=\"Mover para direita\" mdTooltip=\"Mover para direita\"> <md-icon>keyboard_arrow_right</md-icon> </button> <button md-button (click)=\"goUp()\" class=\"md-icon-button\" aria-label=\"Mover para cima\" mdTooltip=\"Mover para cima\"> <md-icon>keyboard_arrow_up</md-icon> </button> <button md-button (click)=\"goDown()\" class=\"md-icon-button\" aria-label=\"Mover para baixo\" mdTooltip=\"Mover para baixo\"> <md-icon>keyboard_arrow_down</md-icon> </button> <button md-button (click)=\"reset()\" class=\"md-icon-button md-primary\" aria-label=\"Restaurar imagem original\" mdTooltip=\"Restaurar imagem original\"> <md-icon>cached</md-icon> </button> </div></div>",
                styles: ['.crop-image-container{max-height:500px;width:100%}.crop-image-container img{max-width:100%;max-height:100%}.crop-controls{padding-top:20px;padding-bottom:20px}[main-loading]{min-height:120px;padding-top:34px;box-sizing:border-box;flex-direction:column;max-width:100%;place-content:center;align-items:center;display:flex}.upcrop-crop .has-text-centered{text-align:center!important}']
            },] },
];
/**
 * @nocollapse
 */
UpcropCropComponent.ctorParameters = function () { return []; };
UpcropCropComponent.propDecorators = {
    'angularCropper': [{ type: ViewChild, args: ['angularCropper',] },],
    'config': [{ type: Input },],
    'uploader': [{ type: Input },],
    'onCropImage': [{ type: Output },],
};

var UpcropDialogComponent = (function () {
    /**
     * @param {?} dialogRef
     * @param {?} data
     */
    function UpcropDialogComponent(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.cropData = {};
        this.uploadedImages = [];
        this.uploader = null;
        this.steps = {
            total: 2,
            options: [{
                    label: 'Subir imagens',
                    number: 1,
                    next: 2,
                    nextDisabled: function () { return _this.step1NextDisabled(); },
                    nextAction: function () { _this.goToStep2(); }
                }, {
                    label: 'Cortar imagens',
                    number: 2,
                    previus: 1,
                    previusAction: function () { _this.goToStep1(); }
                }],
            current: {}
        };
    }
    /**
     * @return {?}
     */
    UpcropDialogComponent.prototype.ngOnInit = function () {
        // 
        // Set first step
        this.steps.current = this.steps.options[0];
    };
    /**
     * Go to step 1
     * @return {?}
     */
    UpcropDialogComponent.prototype.goToStep1 = function () {
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
    };
    /**
     * Go to step 2
     * @return {?}
     */
    UpcropDialogComponent.prototype.goToStep2 = function () {
        // 
        // Change to step 2
        this.steps.current = this.steps.options[1];
        // 
        // Set crop
        this.upcropCrop.setCropping(this.upcropUpload.uploader);
    };
    /**
     * Finish
     * @return {?}
     */
    UpcropDialogComponent.prototype.finish = function () {
        var _this = this;
        // 
        // On complete all files uplaod
        this.upcropUpload.uploader.onCompleteAll = function () {
            // 
            // Remove loading
            _this.upcropCrop.uploading = false;
            // 
            // Close dialog with uploadedImages
            _this.dialogRef.close(_this.uploadedImages);
        };
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
    };
    /**
     * Step 1 next button disabled conditions
     * @return {?}
     */
    UpcropDialogComponent.prototype.step1NextDisabled = function () {
        return !this.upcropUpload.uploader.queue.length;
    };
    /**
     * On crop image event
     * @param {?} event
     * @return {?}
     */
    UpcropDialogComponent.prototype.onCropImage = function (event) {
        // 
        // Create url params with crop data
        var /** @type {?} */ cropData = this.createUrlParams(event.data);
        // 
        // Add crop to uploader file crop data
        this.upcropUpload.uploader.queue[event.file].url = this.data.uploadConfig.url + cropData;
    };
    /**
     * On upload image event
     * @param {?} event
     * @return {?}
     */
    UpcropDialogComponent.prototype.onUploadImage = function (event) {
        this.uploadedImages.push(event.image);
    };
    /**
     * Create url params
     * @param {?} obj
     * @return {?}
     */
    UpcropDialogComponent.prototype.createUrlParams = function (obj) {
        // 
        // Validate obj
        if (!obj)
            return '';
        // 
        // First param
        var /** @type {?} */ url = '?';
        // 
        // Generate url param
        var /** @type {?} */ params = Object.keys(obj).map(function (key) {
            return key + '=' + encodeURIComponent(obj[key]);
        }).join('&');
        return url + params;
    };
    return UpcropDialogComponent;
}());
UpcropDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-upcrop-dialog',
                template: "<h2 md-dialog-title class=\"has-text-danger\"> Upload de imagens <small>com corte</small></h2><md-dialog-content> <div steps> <div steps-content fxLayout=\"row\" fxLayoutAlign=\"start center\"> <button md-icon-button fxHide.xs [disabled]=\"!steps.current.previus || (steps.current.previusDisabled && steps.current.previusDisabled())\" (click)=\"steps.current.previusAction()\"> <md-icon>keyboard_arrow_left</md-icon> </button> <span fxFlex></span> <h3>Passo <b>{{steps.current.number}}</b> de <b>{{steps.total}}</b> / <span class=\"has-text-primary\">{{steps.current.label}}</span> </h3> <span fxFlex></span> <button md-icon-button fxHide.xs [disabled]=\"!steps.current.next || (steps.current.nextDisabled && steps.current.nextDisabled())\" (click)=\"steps.current.nextAction()\"> <md-icon>keyboard_arrow_right</md-icon> </button> </div></div><div class=\"step-1\" [hidden]=\"steps.current.number !=1\"> <app-upcrop-upload #upcropUpload [config]=\"data.uploadConfig\" (onUploadImage)=\"onUploadImage($event)\"></app-upcrop-upload> </div><div class=\"step-2\" [hidden]=\"steps.current.number !=2\"> <app-upcrop-crop #upcropCrop [config]=\"data.cropConfig\" (onCropImage)=\"onCropImage($event)\"></app-upcrop-crop> </div></md-dialog-content><md-dialog-actions *ngIf=\"steps.current.number==1\"> <button md-button md-dialog-close>Fechar</button> <button md-button color=\"primary\" [disabled]=\"!upcropUpload.uploader.queue.length\" (click)=\"goToStep2()\">Continuar</button></md-dialog-actions><md-dialog-actions *ngIf=\"steps.current.number==2\"> <button md-button (click)=\"goToStep1()\">Voltar</button> <button md-button color=\"primary\" [fxHide]=\"upcropCrop.uploader?.queue?.length==(upcropCrop.currentNumber + 1)\" (click)=\"upcropCrop.goToNextCrop()\">Pr\u00F3xima imagem</button> <button md-button color=\"primary\" [fxHide]=\"upcropCrop.uploader?.queue?.length > (upcropCrop.currentNumber + 1)\" [disabled]=\"upcropCrop.uploading\" (click)=\"finish()\">Concluir</button></md-dialog-actions>",
                styles: ['[md-dialog-title] small{color:#b5b5b5!important;font:400 16px/28px Roboto,"Helvetica Neue",sans-serif!important;margin:0 0 16px!important}[steps]{margin:0 -24px 16px;padding-top:16px;padding-bottom:16px;background-color:rgba(0,0,0,.04)}[steps] .has-text-primary{color:#3f51b5!important}[md-dialog-title] .has-text-danger{color:#f44336!important}']
            },] },
];
/**
 * @nocollapse
 */
UpcropDialogComponent.ctorParameters = function () { return [
    { type: MdDialogRef, },
    { type: undefined, decorators: [{ type: Inject, args: [MD_DIALOG_DATA,] },] },
]; };
UpcropDialogComponent.propDecorators = {
    'upcropUpload': [{ type: ViewChild, args: ['upcropUpload',] },],
    'upcropCrop': [{ type: ViewChild, args: ['upcropCrop',] },],
};

var UpcropImagePreviewDirective = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    function UpcropImagePreviewDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    /**
     * Ng on changes
     * Read file when image changes
     * @param {?} changes
     * @return {?}
     */
    UpcropImagePreviewDirective.prototype.ngOnChanges = function (changes) {
        // 
        // Set element and file reader
        var /** @type {?} */ reader = new FileReader();
        var /** @type {?} */ el = this.el;
        // 
        // On load
        reader.onloadend = function (e) {
            el.nativeElement.src = reader.result;
        };
        // 
        // Validate
        if (this.image) {
            return reader.readAsDataURL(this.image);
        }
    };
    return UpcropImagePreviewDirective;
}());
UpcropImagePreviewDirective.decorators = [
    { type: Directive, args: [{
                selector: 'img[upcropImagePreview]'
            },] },
];
/**
 * @nocollapse
 */
UpcropImagePreviewDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
]; };
UpcropImagePreviewDirective.propDecorators = {
    'image': [{ type: Input },],
};

var UpcropService = (function () {
    /**
     * @param {?} dialog
     */
    function UpcropService(dialog) {
        this.dialog = dialog;
        this.dialogConfig = {
            width: '80%'
        };
        this.uploadConfig = {
            url: null,
            authToken: null,
            autoUpload: false,
            additionalParameter: {},
            withCredentials: false
        };
        this.cropConfig = {
            movable: true,
            scalable: true,
            zoomable: true,
            viewMode: 1,
            autoCrop: true,
            autoCropArea: 1
        };
    }
    /**
     * Open dialog with uplaod & crop
     * @param {?=} dialogConfig
     * @param {?=} uploadConfig
     * @param {?=} cropConfig
     * @return {?}
     */
    UpcropService.prototype.open = function (dialogConfig, uploadConfig, cropConfig) {
        var _this = this;
        if (dialogConfig === void 0) { dialogConfig = this.dialogConfig; }
        if (uploadConfig === void 0) { uploadConfig = this.uploadConfig; }
        if (cropConfig === void 0) { cropConfig = this.cropConfig; }
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
        return new Promise(function (resolve, reject) {
            // 
            // Open confirmation dialog
            var /** @type {?} */ dialogRef = _this.dialog.open(UpcropDialogComponent, _this.dialogConfig);
            // 
            // Subscribe to on close event
            dialogRef.afterClosed().subscribe(function (result) {
                // 
                // Validate result
                if (result) {
                    resolve(result);
                }
                else {
                    reject();
                }
            });
        });
    };
    return UpcropService;
}());
UpcropService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
UpcropService.ctorParameters = function () { return [
    { type: MdDialog, },
]; };

var AngularUpcropModule = (function () {
    function AngularUpcropModule() {
    }
    /**
     * @return {?}
     */
    AngularUpcropModule.forRoot = function () {
        return {
            ngModule: AngularUpcropModule
        };
    };
    return AngularUpcropModule;
}());
AngularUpcropModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FileUploadModule,
                    FlexLayoutModule,
                    MdCardModule,
                    MdIconModule,
                    MdButtonModule,
                    MdDialogModule,
                    MdTooltipModule,
                    AngularCropperjsModule
                ],
                declarations: [
                    UpcropUploadComponent,
                    UpcropUploadInstaComponent,
                    UpcropCropComponent,
                    UpcropDialogComponent,
                    UpcropImagePreviewDirective
                ],
                exports: [
                    UpcropUploadComponent,
                    UpcropUploadInstaComponent,
                    UpcropCropComponent,
                    UpcropDialogComponent,
                    UpcropImagePreviewDirective
                ],
                entryComponents: [UpcropDialogComponent]
            },] },
];
/**
 * @nocollapse
 */
AngularUpcropModule.ctorParameters = function () { return []; };

export { AngularUpcropModule, UpcropUploadComponent, UpcropUploadInstaComponent, UpcropCropComponent, UpcropDialogComponent, UpcropImagePreviewDirective, UpcropService };
