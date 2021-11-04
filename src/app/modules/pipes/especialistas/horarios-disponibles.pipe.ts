import { Pipe, PipeTransform } from '@angular/core';
import { StorageService } from '../../auth/services/storage/storage.service';
import { Especialista } from '../../clases/especialista';
import { Turno } from '../../clases/turno';

@Pipe({
  name: 'horariosDisponibles',
})
export class HorariosDisponiblesPipe implements PipeTransform {
  constructor(private storageService: StorageService) {}
  transform(value: string[], arg: Turno) {
    let turnoDelEspecialistaEnLaEspecialidad: Turno[] = [];
    this.storageService
      .getTurnosByEspecialidad(arg.email_especialista!, arg.especialidad!)
      .subscribe((turnos) => {
        setTimeout(() => {
          turnoDelEspecialistaEnLaEspecialidad.push(...turnos);
        }, 500);
      });

    const horariosDisponibles: string[] = value.filter(
      (horario) =>
        !turnoDelEspecialistaEnLaEspecialidad.some(
          (turno) => (turno.horario = horario)
        )
    );

    return horariosDisponibles;
  }
}
