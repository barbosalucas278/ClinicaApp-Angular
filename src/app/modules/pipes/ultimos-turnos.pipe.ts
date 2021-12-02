import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { Paciente } from '../clases/paciente';
import { Estados, Turno } from '../clases/turno';

@Pipe({
  name: 'ultimosTurnos',
})
export class UltimosTurnosPipe implements PipeTransform {
  transform(value: Turno[], args: Paciente): Turno[] {
    let ultimosTurnos: Turno[] = [];
    ultimosTurnos = [
      ...value.filter(
        (turno) =>
          turno.email_paciente == args.email &&
          turno.estado == Estados.Finalizado
      ),
    ];
    ultimosTurnos.sort(function (a: Turno, b: Turno) {
      const diaA = moment(`${a.dia} ${a.horario}`, 'DD-MM hh:mm');
      const diaB = moment(`${b.dia} ${b.horario}`, 'DD-MM hh:mm');
      let ret = -1;
      if (diaB.diff(diaA) >= 0) {
        ret = 1;
      }

      return ret;
    });
    return ultimosTurnos.slice(0, 3);
  }
}
