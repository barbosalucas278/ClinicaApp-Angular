import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
})
export class FechaPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);

    return value;
  }
}
