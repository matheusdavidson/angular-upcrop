import { OnInit, EventEmitter } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
export declare class UpcropUploadComponent implements OnInit {
    config: any;
    uploadQueue: any;
    onUploadQueue: EventEmitter<{}>;
    onUploadImage: EventEmitter<{}>;
    uploader: FileUploader;
    hasFileOver: boolean;
    constructor();
    ngOnInit(): void;
    /**
     * Set uploader
     */
    setUploader(): void;
    /**
     * Truncate filename
     * @param n
     * @param len
     */
    truncate(n: any, len: any): any;
}
