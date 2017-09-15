import { ElementRef, Renderer, SimpleChanges } from '@angular/core';
export declare class UpcropImagePreviewDirective {
    private el;
    private renderer;
    image: any;
    constructor(el: ElementRef, renderer: Renderer);
    /**
     * Ng on changes
     * Read file when image changes
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void;
}
