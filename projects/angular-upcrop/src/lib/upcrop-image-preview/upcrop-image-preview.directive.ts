import { Directive, Input, ElementRef, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: 'img[upcropImagePreview]'
})
export class UpcropImagePreviewDirective {

    @Input() public image: any;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    /**
     * Ng on changes
     * Read file when image changes
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges) {

        //
        // Set element and file reader
        let reader = new FileReader();
        let el = this.el;

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

    }
}
