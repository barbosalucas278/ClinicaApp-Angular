import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LogAcceso } from 'src/app/modules/clases/log-acceso';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-tabla-ingresos',
  templateUrl: './tabla-ingresos.component.html',
  styleUrls: ['./tabla-ingresos.component.scss'],
})
export class TablaIngresosComponent implements OnInit {
  @Input() ingresos: LogAcceso[] = [];
  constructor(private papa: Papa) {}
  ngOnInit(): void {}
  descargarExcel() {
    const excelObject = this.mapData(this.ingresos);
    const csv = this.papa.unparse({ data: excelObject });

    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    let csvURL = null;

    csvURL = window.URL.createObjectURL(csvData);

    // For Browser
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute(
      'download',
      `ingresos-${moment().format('DD-MM-yyyy')}.xlsx`
    );
    tempLink.click();
  }
  // tslint:disable-next-line: typedef
  private mapData(data: LogAcceso[]) {
    return data.map((item) => {
      return {
        email: item.usuario!.email,
        dia: item.dia,
        horario: item.horario,
      };
    });
  }
}
