import { Directive, ElementRef, Input } from '@angular/core';
import { Turno } from '../../clases/turno';

@Directive({
  selector: '[appBackgroundEstado]',
})
export class BackgroundEstadoDirective {
  @Input() appBackgroundEstado: any;
  constructor(private element: ElementRef<HTMLSpanElement>) {
    setTimeout(() => {
      switch (this.appBackgroundEstado) {
        case 'pendiente':
          this.element.nativeElement.classList.add(
            ...['badge', 'bg-secondary']
          );
          break;
        case 'cancelado':
          this.element.nativeElement.classList.add(...['badge', 'bg-danger']);
          break;
        case 'rechazado':
          this.element.nativeElement.classList.add(
            ...['badge', 'bg-warning', 'text-dark']
          );
          break;
        case 'aceptado':
          this.element.nativeElement.classList.add(...['badge', 'bg-primary']);
          break;
        case 'tomado':
          this.element.nativeElement.classList.add(...['badge', 'bg-success']);
          break;
        case 'finalizado':
          this.element.nativeElement.classList.add(
            ...['badge', 'bg-black', 'text-light']
          );
          break;

        default:
          break;
      }
    }, 10);
  }
}
