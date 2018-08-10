import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularUpcropModule } from 'angular-upcrop';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AngularUpcropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
