import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appImagenRota]'
})
export class ImagenRotaDirective {

  constructor(private element:ElementRef) { }
  @HostListener('error')
  cargarImagenPorDefecto(){
    const img=this.element.nativeElement
    img.src="assets/images/default.png"
  }
}
