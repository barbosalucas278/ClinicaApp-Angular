import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Encuesta } from 'src/app/modules/clases/encuesta';
import { Resenia } from 'src/app/modules/clases/resenia';
import { Estados, Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-card-turno',
  templateUrl: './card-turno.component.html',
  styleUrls: ['./card-turno.component.scss'],
})
export class CardTurnoComponent implements OnInit {
  @Input() turno: Turno = {};
  resenia: Resenia = {};
  encuesta: Encuesta = {};
  calificacion: string = '';
  constructor(private storageService: StorageService) {
    this.resenia.comentario = '';
    this.resenia.motivo = '';
  }

  ngOnInit(): void {}
  onCancelarturno(id_turno: number) {
    this.resenia.motivo = 'Cancelado';
    this.storageService.updateEstadoDeUnTurno(Estados.Cancelado, id_turno, [
      this.resenia,
    ]);
  }
  onEnviarEncuesta(id_turno: number) {
    this.resenia.motivo = 'Cancelado';
    this.storageService.guardarEncuestaTurno(id_turno, this.encuesta);
  }
  onCancelarModalCancelar() {
    this.resenia.comentario = '';
  }
  onEnviarCalificacion(id_turno: number) {
    this.storageService.guardarCalificacionTurno(id_turno, this.calificacion);
  }
}
