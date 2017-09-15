import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpcropUploadComponent } from './upcrop-upload/upcrop-upload.component';
import { UpcropCropComponent } from './upcrop-crop/upcrop-crop.component';
import { UpcropDialogComponent } from './upcrop-dialog/upcrop-dialog.component';
import { UpcropImagePreviewDirective } from './upcrop-image-preview/upcrop-image-preview.directive';
import { FileUploadModule } from 'ng2-file-upload';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdCardModule, MdIconModule, MdButtonModule, MdDialogModule, MdTooltipModule } from "@angular/material";
import { AngularCropperjsModule } from 'angular-cropperjs';

export * from './upcrop-upload/upcrop-upload.component';
export * from './upcrop-crop/upcrop-crop.component';
export * from './upcrop-dialog/upcrop-dialog.component';
export * from './upcrop-image-preview/upcrop-image-preview.directive';
export * from './upcrop/upcrop.service';

@NgModule({
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
        UpcropCropComponent,
        UpcropDialogComponent,
        UpcropImagePreviewDirective
    ],
    exports: [
        UpcropUploadComponent,
        UpcropCropComponent,
        UpcropDialogComponent,
        UpcropImagePreviewDirective
    ],
    entryComponents: [UpcropDialogComponent]
})
export class AngularUpcropModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularUpcropModule
        };
    }
}