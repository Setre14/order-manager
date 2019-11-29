import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  @Input() public appAutoFocus: boolean;
  @Input() focus = true;

  public constructor(private el: ElementRef) {}

  public ngAfterContentInit() {
    if (this.focus) {
      this.el.nativeElement.focus();
    }
  }
}
