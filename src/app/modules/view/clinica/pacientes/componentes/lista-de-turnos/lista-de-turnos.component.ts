import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Encuesta } from 'src/app/modules/clases/encuesta';
import { Resenia } from 'src/app/modules/clases/resenia';
import { Estados, Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-lista-de-turnos',
  templateUrl: './lista-de-turnos.component.html',
  styleUrls: ['./lista-de-turnos.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          visibility: 'visible',
          height: '50px',
          width: '500px',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          visibility: 'hidden',
          height: '0px',
          width: '0px',
          opacity: 1,
        })
      ),
      transition('open => closed', [animate('0.8s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
})
export class ListaDeTurnosComponent implements OnInit {
  isOpen: boolean = false;
  turnosPaciente: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  turnoActivo?: Turno;
  id_turnoActivo?: number;
  resenia: Resenia = {};
  encuesta: Encuesta = {};
  calificacion: string = '';
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.resenia.comentario = '';
    this.resenia.motivo = '';
    this.storageService
      .getTurnosByPaciente(this.authService.currentUser.email)
      .subscribe((T) => {
        setTimeout(() => {
          this.turnosPaciente = T;
          if (this.turnosFiltrados.length == 0) {
            this.turnosFiltrados = this.turnosPaciente;
          } else {
            this.turnosFiltrados = this.turnosPaciente.filter((p) =>
              this.turnosFiltrados.some(
                (filtrado) => filtrado.id_turno == p.id_turno
              )
            );
          }
          this.turnosFiltrados.sort(ordenarTurnos);
        }, 1000);
      });
  }
  onChangeBusqueda($event: any) {
    let palabraClave: string = $event.target.value;
    if (palabraClave != '') {
      for (let index = 0; index < palabraClave.length; index++) {
        if (index == 0) {
          const arr = palabraClave.split('');
          arr[0] = palabraClave[index].toUpperCase();
          palabraClave = arr.join('');
        }
      }

      this.turnosFiltrados = this.turnosPaciente.filter((T) => {
        const regex = new RegExp('\\b(' + palabraClave + ')\\b', 'gi');

        return (
          T.especialidad?.startsWith(palabraClave) ||
          T.nombre_especialista?.startsWith(palabraClave) ||
          regex.test(JSON.stringify(T))
        );
      });
    } else {
      this.turnosFiltrados = this.turnosPaciente;
    }
  }
  onBuscar() {
    this.isOpen = !this.isOpen;
  }
  onCancelarturno(id_turno: number) {
    console.log(id_turno);

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
    this.storageService.guardarCalificacionTurno(
      this.id_turnoActivo!,
      this.calificacion
    );
  }
  onAccionTurno(turno: Turno) {
    this.id_turnoActivo = turno.id_turno;
    this.turnoActivo = this.turnosFiltrados.find(
      (t) => t.id_turno == this.id_turnoActivo
    );
  }
  ngOnInit(): void {}
}
function ordenarTurnos(a: Turno, b: Turno) {
  const diaA = moment(`${a.dia} ${a.horario}`, 'DD-MM hh:mm');
  const diaB = moment(`${b.dia} ${b.horario}`, 'DD-MM hh:mm');
  let ret = -1;
  if (diaB.diff(diaA) >= 0) {
    ret = 1;
  }

  return ret;
}
