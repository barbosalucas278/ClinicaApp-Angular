import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundEstadoDirective } from './turnos/background-estado.directive';

@NgModule({
  declarations: [BackgroundEstadoDirective],
  exports: [BackgroundEstadoDirective],
  imports: [CommonModule],
})
export class DirectivasModule {}
