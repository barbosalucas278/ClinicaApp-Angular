import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { HistoriaClinica } from 'src/app/modules/clases/historia-clinica';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historia-clinica-card',
  templateUrl: './historia-clinica-card.component.html',
  styleUrls: ['./historia-clinica-card.component.scss'],
})
export class HistoriaClinicaCardComponent implements OnInit {
  @Input() email_paciente: string = '';
  historiaClinica?: HistoriaClinica;
  mostrarSpinner: boolean = true;
  imgLogoEmpresa: string = environment.urlImgLogoEmpresa;
  nombreCompletoPaciente: string = '';
  constructor(private usuariosService: UsuarioService) {}
  cargarPaciente() {
    this.usuariosService.obtenerPaciente(this.email_paciente).subscribe((P) => {
      this.historiaClinica = P[0].historiaClinica!;
      this.mostrarSpinner = false;
      this.nombreCompletoPaciente = `${P[0].nombre}, ${P[0].apellido}`;
    });
  }
  ngOnInit(): void {
    this.cargarPaciente();
  }
  descargarPDF() {
    let DATA = document.getElementById(`contenedorHistoria`);

    html2canvas(DATA!).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let positionImagen = 50;
      PDF.addImage(this.imgLogoEmpresa, 'PNG', 140, 0, 50, 50);
      PDF.text(`Fecha de emisión: ${moment().format('DD-MM-yyy')}`, 10, 30);
      PDF.text(
        `Historia Clínica del paciente: ${this.nombreCompletoPaciente}`,
        10,
        40
      );
      PDF.addImage(FILEURI, 'PNG', 0, positionImagen, fileWidth, fileHeight);

      PDF.save(
        `${this.email_paciente.split('@')[0]}-${moment().format(
          'DD-MM-yyy'
        )}.pdf`
      );
    });
  }
}
