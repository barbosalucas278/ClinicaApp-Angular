import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { GraficoLineasComponent } from './grafico-lineas/grafico-lineas.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoBarrasLateralesComponent } from './grafico-barras-laterales/grafico-barras-laterales.component';
import { GraficoTortaComponent } from './grafico-torta/grafico-torta.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    GraficoLineasComponent,
    GraficoBarrasLateralesComponent,
    GraficoTortaComponent,
  ],
  exports: [
    SpinnerComponent,
    GraficoLineasComponent,
    GraficoBarrasLateralesComponent,
    GraficoTortaComponent,
  ],
  imports: [CommonModule, ChartsModule],
})
export class ComponentesGenericosModule {}
