import { Pipe, PipeTransform } from '@angular/core';
import { Especialidad } from '../../clases/especialidad';

@Pipe({
  name: 'especialidadesToString',
})
export class EspecialidadesToStringPipe implements PipeTransform {
  transform(value: Especialidad[], ...args: unknown[]): unknown {
    return value.map((E) => E.detalle).join(', ');
  }
}
