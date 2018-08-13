import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatIconModule, MatButtonModule, MatCardModule, MatTooltipModule } from '@angular/material';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileUploadModule } from 'ng2-file-upload';
import { UpcropComponent } from './upcrop/upcrop.component';
import { UpcropDialogComponent } from './upcrop-dialog/upcrop-dialog.component';
import { UpcropCropComponent } from './upcrop-crop/upcrop-crop.component';
import { UpcropUploadComponent } from './upcrop-upload/upcrop-upload.component';
import { UpcropImagePreviewDirective } from './upcrop-image-preview/upcrop-image-preview.directive';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FileUploadModule,
        FlexLayoutModule,
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatTooltipModule,
        AngularCropperjsModule
    ],
    declarations: [UpcropComponent, UpcropDialogComponent, UpcropCropComponent, UpcropUploadComponent, UpcropImagePreviewDirective],
    exports: [UpcropComponent, UpcropDialogComponent, UpcropCropComponent, UpcropUploadComponent, UpcropImagePreviewDirective],
    entryComponents: [UpcropDialogComponent]
})
export class AngularUpcropModule { }
