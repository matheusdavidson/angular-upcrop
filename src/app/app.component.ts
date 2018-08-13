import { Component } from '@angular/core';
import { UpcropService } from 'angular-upcrop';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [UpcropService]
})
export class AppComponent {

    constructor(
        public upcropService: UpcropService
    ) { }

    //
    // Create a method in the component to trigger upcrop
    openUpcrop() {
        console.log('open');
        //
        // Set config for dialog, upload and crop components
        let dialogConfig = {};
        let uploadConfig = {
            url: environment.api + 'events/upload',
            additionalParameter: {}
        };
        let cropConfig = {};

        //
        // Open upcrop dialog
        console.log('open start');
        this.upcropService.open(dialogConfig, uploadConfig, cropConfig).then((data) => {
            console.log('data', data);
            //
            // Data will contain an array with the images
            data;
        }).catch((err) => {
            console.log('error', err);
        });
    }
}
