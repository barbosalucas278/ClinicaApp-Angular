import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grafico-barras-verticales',
  templateUrl: './grafico-barras-verticales.component.html',
  styleUrls: ['./grafico-barras-verticales.component.scss'],
})
export class GraficoBarrasVerticalesComponent implements OnInit {
  @Input() tituloGrafico!: string;
  @Input() chartData: ChartDataSets[] = [];
  @Input() chartLabels: Label[] = [];
  imgLogoEmpresa: string = environment.urlImgLogoEmpresa;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  ngOnInit() {}
  constructor() {}
  descargarPDF() {
    let DATA = document.getElementById(`contenedorGrafico`);

    html2canvas(DATA!).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let positionImagen = 50;
      PDF.addImage(this.imgLogoEmpresa, 'PNG', 140, 0, 50, 50);
      PDF.text(`Fecha de emisión: ${moment().format('DD-MM-yyy')}`, 10, 30);
      PDF.text(`${this.tituloGrafico}`, 10, 40);
      PDF.addImage(FILEURI, 'PNG', 0, positionImagen, fileWidth, fileHeight);

      PDF.save(`informe-grafico-${moment().format('DD-MM-yyy')}.pdf`);
    });
  }
}
