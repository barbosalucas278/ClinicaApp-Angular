import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Turno } from 'src/app/modules/clases/turno';
import { Papa } from 'ngx-papaparse';
import { AnimateGallery } from 'src/app/animations';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss'],
  animations: [AnimateGallery],
})
export class TurnosPacienteComponent implements OnInit {
  @Input() email_paciente: string = '';
  turnosPaciente: Turno[] = [];
  especialidades: string[] = [];
  showRegistrosTurnos: boolean = false;
  constructor(private storageService: StorageService, private papa: Papa) {}

  ngOnInit(): void {
    this.storageService
      .getTurnosByPaciente(this.email_paciente)
      .subscribe((T) => {
        this.turnosPaciente = T;
        this.especialidades = [
          ...new Set(T.map((turno) => turno.especialidad!)),
        ];
      });
  }
  onShowRegistroTurnos() {
    this.showRegistrosTurnos = true;
  }
  descargarRegistro(especialidad: string) {
    const excelObject = this.mapData(
      this.turnosPaciente.filter((T) => T.especialidad == especialidad)
    );
    const csv = this.papa.unparse({ data: excelObject });

    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    let csvURL = null;

    csvURL = window.URL.createObjectURL(csvData);

    // For Browser
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute(
      'download',
      `turnos-${moment().format('DD-MM-yyyy')}.xlsx`
    );
    tempLink.click();
  }
  // tslint:disable-next-line: typedef
  private mapData(data: Turno[]) {
    return data.map((item) => {
      return {
        dia: item.dia,
        horario: item.horario,
        estado: item.estado,
        nombre_especialista: item.nombre_especialista,
        especialidad: item.especialidad,
      };
    });
  }
}
