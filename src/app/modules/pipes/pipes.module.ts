import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesToStringPipe } from './especialistas/especialidades-to-string.pipe';
import { HorariosDisponiblesPipe } from './especialistas/horarios-disponibles.pipe';

@NgModule({
  declarations: [EspecialidadesToStringPipe, HorariosDisponiblesPipe],
  exports: [EspecialidadesToStringPipe, HorariosDisponiblesPipe],
  imports: [CommonModule],
})
export class PipesModule {}
