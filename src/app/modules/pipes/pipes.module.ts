import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesToStringPipe } from './especialistas/especialidades-to-string.pipe';
import { HorariosDisponiblesPipe } from './especialistas/horarios-disponibles.pipe';
import { FechaPipe } from './fecha.pipe';

@NgModule({
  declarations: [EspecialidadesToStringPipe, HorariosDisponiblesPipe, FechaPipe],
  exports: [EspecialidadesToStringPipe, HorariosDisponiblesPipe,FechaPipe],
  imports: [CommonModule],
})
export class PipesModule {}
