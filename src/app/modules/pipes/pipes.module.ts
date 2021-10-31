import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesToStringPipe } from './especialistas/especialidades-to-string.pipe';

@NgModule({
  declarations: [
    EspecialidadesToStringPipe
  ],
  exports: [
    EspecialidadesToStringPipe
  ],
  imports: [CommonModule],
})
export class PipesModule {}
