import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appPrimeDropDown]'
})
export class PrimeDropDownDirective {


    constructor(private el: ElementRef, private renderer: Renderer2) { }
    dropdownComponent: any
    ngOnInit() {
        this.dropdownComponent = this.el.nativeElement.querySelector('.p-dropdown.p-component');
        this.renderer.setStyle(this.dropdownComponent, 'width', '100%');
    }

    // @HostListener('click') onClick() {
    //     console.log('click')
    //     this.renderer.setStyle(this.dropdownComponent, 'border-radis', 'none');
    // }

}

