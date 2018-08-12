# angular-upcrop

Library with upload and crop feature for Angular 6+

## How to use

1- Install `angular-upcrop`

```bash
$ npm install angular-upcrop --save
```

2- Add `angular-upcrop` to the module you want to use, for example: `AppModule`

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//
// Import and load UpcropModule
import { UpcropModule } from 'angular-upcrop';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    //
    // Load UpcropModule
    UpcropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3- Now you need to create an action for some button inside your component and trigger the `open` method in `UpcropService`

*Import `UpcropService` in the component you want to use, for example: `AppComponentModule`, add to the providers section then create an action to trigger `open()`*

```typescript

//
// Import the service
import { UpcropService } from 'angular-upcrop';

@Component({

  ...

  //
  // Add UpcropService to the component providers
  providers: [UpcropService],

  ...
})
export class AppComponentModule { 

  ...

  //
  // Create a method in the component to trigger upcrop
  openUpcrop() {

    // 
    // Set config for dialog, upload and crop components
    let dialogConfig = {};
    let uploadConfig = {
        url: environment.api + 'products/models/upload',
        additionalParameter: {}
    };
    let cropConfig = {};

    // 
    // Open upcrop dialog
    this.upcropService.open(dialogConfig, uploadConfig, cropConfig).then((data) => {

        // 
        // Data will contain an array with the images
        data;
    }).catch((err) => {
    });
  }

  ...

}
```

*Now you just need to call the `openUpcrop` method you've created*
```html
<button (click)="openUpcrop()">Open upcrop</button>
```

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## License

MIT © [Matheus Davidson](mailto:matheusdavidson@gmail.com)
