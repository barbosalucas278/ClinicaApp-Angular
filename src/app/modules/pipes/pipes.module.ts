import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesToStringPipe } from './especialistas/especialidades-to-string.pipe';
import { HorariosDisponiblesPipe } from './especialistas/horarios-disponibles.pipe';
import { NombreYApellidoPipe } from './nombre-yapellido.pipe';
import { UltimosTurnosPipe } from './ultimos-turnos.pipe';

@NgModule({
  declarations: [
    EspecialidadesToStringPipe,
    HorariosDisponiblesPipe,
    NombreYApellidoPipe,
    UltimosTurnosPipe,
  ],
  exports: [
    EspecialidadesToStringPipe,
    HorariosDisponiblesPipe,
    NombreYApellidoPipe,
    UltimosTurnosPipe,
  ],
  imports: [CommonModule],
})
export class PipesModule {}
