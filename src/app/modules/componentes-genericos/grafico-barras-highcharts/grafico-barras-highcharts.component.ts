import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-grafico-barras-highcharts',
  templateUrl: './grafico-barras-highcharts.component.html',
  styleUrls: ['./grafico-barras-highcharts.component.scss'],
})
export class GraficoBarrasHighchartsComponent implements OnInit {
  @Input() tituloGrafico!: string;
  @Input() chartData: ChartDataSets[] = [];
  @Input() chartLabels: Label[] = [];
  barChartOptions?: Options;
  chart?: Chart;

  constructor() {}
  ngOnInit() {
    console.log(this.chartData);

    this.barChartOptions = {
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: this.tituloGrafico,
      },
      yAxis: {
        visible: true,
      },
      legend: {
        enabled: false,
      },
      xAxis: {
        lineColor: '#fff',
        categories: this.chartLabels.map((label) => {
          let str: string = label.toString();
          return str;
        }),
      },
      series: [
        {
          name: 'Turnos',
          type: 'column',
          color: '#506ef9',
          data: [
            ...this.chartData[0].data!.map((p) => {
              let serie: any = { y: p! };
              return serie;
            }),
          ],
        },
      ],
    };
    this.chart = new Chart(this.barChartOptions);
  }
}
