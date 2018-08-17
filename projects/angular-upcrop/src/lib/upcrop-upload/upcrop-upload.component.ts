import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

@Component({
    selector: 'upcrop-upload',
    templateUrl: './upcrop-upload.component.html',
    styleUrls: ['./upcrop-upload.component.css']
})
export class UpcropUploadComponent implements OnInit {

    @Input() public config: any = {};
    @Input() public uploadQueue: any = [];
    @Output() public onUploadQueue = new EventEmitter();
    @Output() public onUploadImage = new EventEmitter();

    public uploader: FileUploader = new FileUploader({});
    public hasFileOver: boolean = false;

    constructor() { }

    ngOnInit() {

        //
        // Set uploader
        this.setUploader();
    }

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

        //
        // After add file event
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

        //
        // On success item event
        this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {

            if (status == 200) {

                //
                // Parse response
                let data = JSON.parse(response);

                //
                // Emit onUploadQueue
                this.onUploadImage.emit({
                    data: data
                });
            } else {
            }
        };
    }

    /**
     * On file over event
     * @param e
     */
    public onFileOver(e: any): void {
        this.hasFileOver = e;
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
