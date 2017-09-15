import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from "ng2-file-upload";

@Component({
    selector: 'app-upcrop-upload',
    template: `<label ng2FileDrop multiple class="my-drop-zone" [ngClass]="{'nv-file-over': hasFileOver}" (fileOver)="onFileOver($event)" [uploader]="uploader" fxLayout fxLayoutAlign="center center"> Área de upload <input type="file" ng2FileSelect multiple [uploader]="uploader" style="display: none"/></label><table class="table upcrop-upload-table"> <thead> <tr> <th>Preview</th> <th>Arquivo</th> <th> <md-icon class="is-pulled-right">settings</md-icon> </th> </tr></thead> <tbody> <tr *ngFor="let item of uploader.queue"> <td style="width:120px"> <img upcropImagePreview [image]="item?._file" class="media-object"/> </td><td>{{truncate(item?.file?.name, 16)}}</td><td class="actions" style="width:53px"> <a class="button is-small is-danger is-outlined" (click)="item.remove()"> <span class="icon is-small"> <i class="fa fa-trash"></i> </span> </a> </td></tr><tr [hidden]="uploader.queue.length"> <td colspan="3" class="has-text-danger"> Nenhum arquivo, adicione acima. </td></tr></tbody></table>`,
    styles: ['.my-drop-zone{border:2px dashed rgba(0,0,0,.04);width:100%;display:flex;padding:20px;background-color:rgba(0,0,0,.04);color:rgba(0,0,0,.7)}.nv-file-over{border:2px dashed rgba(244,67,54,.4)}[upcropImagePreview]{display:block}.upcrop-upload-table{background-color:#fff;color:#363636}.upcrop-upload-table td,.upcrop-upload-table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:.5em .75em;vertical-align:top}.upcrop-upload-table td.is-white,.upcrop-upload-table th.is-white{background-color:#fff;border-color:#fff;color:#0a0a0a}.upcrop-upload-table td.is-black,.upcrop-upload-table th.is-black{background-color:#0a0a0a;border-color:#0a0a0a;color:#fff}.upcrop-upload-table td.is-light,.upcrop-upload-table th.is-light{background-color:#f5f5f5;border-color:#f5f5f5;color:#363636}.upcrop-upload-table td.is-dark,.upcrop-upload-table th.is-dark{background-color:#363636;border-color:#363636;color:#f5f5f5}.upcrop-upload-table td.is-primary,.upcrop-upload-table th.is-primary{background-color:#00d1b2;border-color:#00d1b2;color:#fff}.upcrop-upload-table td.is-info,.upcrop-upload-table th.is-info{background-color:#3273dc;border-color:#3273dc;color:#fff}.upcrop-upload-table td.is-success,.upcrop-upload-table th.is-success{background-color:#23d160;border-color:#23d160;color:#fff}.upcrop-upload-table td.is-warning,.upcrop-upload-table th.is-warning{background-color:#ffdd57;border-color:#ffdd57;color:rgba(0,0,0,.7)}.upcrop-upload-table td.is-danger,.upcrop-upload-table th.is-danger{background-color:#ff3860;border-color:#ff3860;color:#fff}.upcrop-upload-table td.is-narrow,.upcrop-upload-table th.is-narrow{white-space:nowrap;width:1%}.upcrop-upload-table th{color:#363636;text-align:left}.upcrop-upload-table tr:hover{background-color:#fafafa}.upcrop-upload-table tr.is-selected{background-color:#00d1b2;color:#fff}.upcrop-upload-table tr.is-selected a,.upcrop-upload-table tr.is-selected strong{color:currentColor}.upcrop-upload-table tr.is-selected td,.upcrop-upload-table tr.is-selected th{border-color:#fff;color:currentColor}.upcrop-upload-table thead td,.upcrop-upload-table thead th{color:#363636}.upcrop-upload-table tfoot td,.upcrop-upload-table tfoot th{border-width:2px 0 0;color:#363636}.upcrop-upload-table tbody tr:last-child td,.upcrop-upload-table tbody tr:last-child th{border-bottom-width:0}.upcrop-upload-table.is-bordered td,.upcrop-upload-table.is-bordered th{border-width:1px}.upcrop-upload-table.is-bordered tr:last-child td,.upcrop-upload-table.is-bordered tr:last-child th{border-bottom-width:1px}.upcrop-upload-table.is-fullwidth{width:100%}.upcrop-upload-table.is-narrow td,.upcrop-upload-table.is-narrow th{padding:.25em .5em}.upcrop-upload-table.is-striped tbody tr:not(.is-selected):nth-child(even){background-color:#fafafa}.upcrop-upload-table.is-striped tbody tr:not(.is-selected):nth-child(even):hover{background-color:#f5f5f5}td,th{padding:0;text-align:left}.upcrop-upload-table-search{display:flex;padding:1.3em 1.6em}.upcrop-upload-table-search input{font-size:14px;flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1;border:none;background-color:transparent;outline:-webkit-focus-ring-color auto 0!important}.upcrop-upload-table-search>md-icon{margin-right:16px;margin-top:2px}[table-loading]{position:absolute;width:100%;margin-top:59px!important;background-color:rgba(255,255,255,.9);height:calc(100% - 59px);z-index:1}[table-no-entries]{padding:1.6em}.mat-card[has-table]{padding:0}.mat-card[has-table] .mat-card-actions{padding:8px!important;margin:0;border-top:1px solid #dbdbdb;border-color:rgba(0,0,0,.09)}.mat-card[has-table] .mat-card-actions .mat-icon-button{color:rgba(0,0,0,.54)}.mat-card[has-table] .mat-card-actions .mat-icon-button[disabled]{color:rgba(0,0,0,.18)}.mat-card[has-table] .mat-card-actions .mat-paginator-page-size-label{margin:0 15px;color:rgba(0,0,0,.54);font-size:12px;font-weight:400}.upcrop-upload-table{border-collapse:collapse;border-spacing:0;width:100%;margin-bottom:0}.upcrop-upload-table .actions .button{margin-bottom:-.25em;margin-top:-.15em}.upcrop-upload-table thead tr{background-color:rgba(0,0,0,.04)!important}.upcrop-upload-table thead td:first-of-type,.upcrop-upload-table thead th:first-of-type{padding-left:1.8em}.upcrop-upload-table thead td:last-of-type,.upcrop-upload-table thead th:last-of-type{padding-right:1.8em}.upcrop-upload-table thead td md-icon,.upcrop-upload-table thead th md-icon{height:16px;width:16px;line-height:16px;font-size:16px;vertical-align:bottom;margin-right:3px}.upcrop-upload-table tbody td,.upcrop-upload-table tbody th{border-color:rgba(0,0,0,.04)}.upcrop-upload-table tbody td:first-of-type,.upcrop-upload-table tbody th:first-of-type{padding-left:1.6em}.upcrop-upload-table tbody td:last-of-type,.upcrop-upload-table tbody th:last-of-type{padding-right:1.6em}.upcrop-upload-table thead td,.upcrop-upload-table thead th{color:rgba(0,0,0,.54);font-size:12px;font-weight:400;padding:1.3em .75em;border:none;border-width:0}.upcrop-upload-table tbody td{color:rgba(0,0,0,.87);padding:1em .75em;font-size:.9rem;font-weight:400}@media (max-width:800px){.upcrop-upload-table{vertical-align:top;max-width:100%;overflow-x:auto;white-space:nowrap;border-collapse:collapse;border-spacing:0;display:flex;overflow:hidden;background:0 0}.upcrop-upload-table .actions a{margin-top:-.35em}.upcrop-upload-table .is-pulled-right{float:none!important}.upcrop-upload-table thead{display:flex;flex-shrink:0;min-width:min-content}.upcrop-upload-table thead td,.upcrop-upload-table thead th{padding:1.3em 1.8em;text-align:right;width:100%!important}.upcrop-upload-table thead td md-icon,.upcrop-upload-table thead th md-icon{margin-right:0}.upcrop-upload-table tbody{flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1;-webkit-overflow-scrolling:touch;background:radial-gradient(left,ellipse,rgba(0,0,0,.2) 0,transparent 75%) 0 center,radial-gradient(right,ellipse,rgba(0,0,0,.2) 0,transparent 75%) 100% center;background-size:10px 100%,10px 100%;background-attachment:scroll,scroll;background-repeat:no-repeat;display:flex;position:relative;overflow-x:auto;overflow-y:hidden;margin-right:1.6em}.upcrop-upload-table tbody tr{flex:1 1 100%;box-sizing:border-box;-webkit-box-flex:1}.upcrop-upload-table tbody td,.upcrop-upload-table tbody th{padding:1.155em 1.6em;text-align:left!important}.upcrop-upload-table tbody td:first-of-type,.upcrop-upload-table tbody th:first-of-type{padding-left:1.6em}.upcrop-upload-table tbody td:last-of-type,.upcrop-upload-table tbody th:last-of-type{padding-right:1.6em}.upcrop-upload-table tr{display:flex;flex-direction:column;min-width:min-content;flex-shrink:0}.upcrop-upload-table td,.upcrop-upload-table th{display:block;background-image:none!important;border-left:0}.upcrop-upload-table td:first-child,.upcrop-upload-table th:first-child{background-image:linear-gradient(to right,#fff 50%,rgba(255,255,255,0) 100%);background-repeat:no-repeat;background-size:20px 100%}.upcrop-upload-table td:last-child,.upcrop-upload-table th:last-child{background-image:linear-gradient(to left,#fff 50%,rgba(255,255,255,0) 100%);background-repeat:no-repeat;background-position:100% 0;background-size:20px 100%}.upcrop-upload-table td:not(:last-child),.upcrop-upload-table th:not(:last-child){border-bottom:0}}.upcrop-upload-table ::-webkit-scrollbar{height:8px;overflow:visible;width:16px}.upcrop-upload-table ::-webkit-scrollbar-button{height:0;width:0}.upcrop-upload-table ::-webkit-scrollbar-corner{background:0 0}.upcrop-upload-table ::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.2);background-clip:padding-box;border:solid transparent;border-width:1px 1px 1px 6px;min-height:28px;padding:100px 0 0;-webkit-box-shadow:inset 1px 1px 0 rgba(0,0,0,.1),inset 0 -1px 0 rgba(0,0,0,.07);box-shadow:inset 1px 1px 0 rgba(0,0,0,.1),inset 0 -1px 0 rgba(0,0,0,.07)}.upcrop-upload-table ::-webkit-scrollbar-track{background-clip:padding-box;border:solid transparent;border-width:0 0 0 4px}[enterlist] [has-table]{margin-right:-24px;margin-left:-24px}[enterlist] [has-table] .upcrop-upload-table{background-color:transparent}[enterlist] [has-table] .upcrop-upload-table thead tr{background-color:rgba(0,0,0,.02)!important}[enterlist] [has-table] .upcrop-upload-table tr:hover{background-color:inherit}']
})
export class UpcropUploadComponent implements OnInit {

    @Input()
    public config: any = {};

    @Input()
    public uploadQueue: any = [];

    @Output()
    public onUploadQueue = new EventEmitter();

    @Output()
    public onUploadImage = new EventEmitter();

    public uploader: FileUploader = new FileUploader({});
    public hasFileOver: boolean = false;


    /*--------  Constructor  --------*/


    constructor() { }


    /*--------  Hooks  --------*/


    ngOnInit() {

        // 
        // Set uploader
        this.setUploader();
    }


    /*--------  Methods  --------*/


    /**
     * Set uploader
     */
    setUploader() {

        //
        // Context for uploader 
        let self = this;

        // 
        // Set uploader
        this.uploader.setOptions({ url: this.config.url, authToken: this.config.authToken, autoUpload: this.config.autoUpload, additionalParameter: this.config.additionalParameter });
        this.uploader.onAfterAddingFile = (file) => {

            // 
            // Set with credentials
            file.withCredentials = this.config.withCredentials;

            // 
            // Emit onUploadQueue
            this.onUploadQueue.emit({
                file: file
            });
        };
        this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {

            if (status == 200) {

                // 
                // Parse response
                let data = JSON.parse(response);

                // 
                // Emit onUploadQueue
                this.onUploadImage.emit({
                    file: data.file
                });
            } else {
            }
        };
    }

    /**
     * Truncate filename
     * @param n 
     * @param len 
     */
    truncate(n, len) {

        // 
        // Validate
        if (!n) return n;

        let ext = n.substring(n.lastIndexOf(".") + 1, n.length).toLowerCase();
        let filename = n.replace('.' + ext, '');
        if (filename.length <= len) {
            return n;
        }
        filename = filename.substr(0, len) + (n.length > len ? '[...]' : '');
        return filename + '.' + ext;
    }
}
