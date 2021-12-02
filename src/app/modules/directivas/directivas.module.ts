import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundEstadoDirective } from './turnos/background-estado.directive';
import { RecaptchaDirective } from './recaptcha.directive';

@NgModule({
  declarations: [BackgroundEstadoDirective, RecaptchaDirective],
  exports: [BackgroundEstadoDirective],
  imports: [CommonModule],
})
export class DirectivasModule {}
