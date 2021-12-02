import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { GraficoLineasComponent } from './grafico-lineas/grafico-lineas.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoBarrasHighchartsComponent } from './grafico-barras-highcharts/grafico-barras-highcharts.component';
import { GraficoTortaComponent } from './grafico-torta/grafico-torta.component';
import { GraficoBarrasVerticalesComponent } from './grafico-barras-verticales/grafico-barras-verticales.component';
import { ChartModule } from 'angular-highcharts';
import { CaptchaComponent } from './captcha/captcha.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    GraficoLineasComponent,
    GraficoBarrasHighchartsComponent,
    GraficoTortaComponent,
    GraficoBarrasVerticalesComponent,
    CaptchaComponent,
  ],
  exports: [
    SpinnerComponent,
    GraficoLineasComponent,
    GraficoBarrasHighchartsComponent,
    GraficoTortaComponent,
    GraficoBarrasVerticalesComponent
  ],
  imports: [CommonModule, ChartsModule,ChartModule],
})
export class ComponentesGenericosModule {}
