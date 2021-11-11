import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-grafico-torta',
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.scss'],
})
export class GraficoTortaComponent implements OnInit {
  @Input() tituloGrafico!: string;
  @Input() chartData: ChartDataSets[] = [];
  @Input() chartLabels: Label[] = [];
  imgLogoEmpresa: string = environment.urlImgLogoEmpresa;
  CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit() {
    this.chartData.forEach((c) => {
      c.backgroundColor = Object.values(this.CHART_COLORS);
    });
  }
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
