# angular-upcrop

Library with upload and crop feature for Angular 4+

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

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Matheus Davidson](mailto:matheusdavidson@gmail.com)
