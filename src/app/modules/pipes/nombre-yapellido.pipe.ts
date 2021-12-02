import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Pipe({
  name: 'nombreYApellido',
})
export class NombreYApellidoPipe implements PipeTransform {
  transform(value: Usuario, ...args: unknown[]): unknown {
    return `${value.apellido}, ${value.nombre}`;
  }
}
