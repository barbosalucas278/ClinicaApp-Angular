import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Resenia } from 'src/app/modules/clases/resenia';
import { Estados, Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.scss'],
})
export class TablaTurnosComponent implements OnInit {
  @Input() adminPanel: boolean;
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  resenia: Resenia = {};
  id_turnoActivo: number = 0;
  suscripcionEspecialista: Subscription;
  palabraClave: string = '';
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.adminPanel = false;

    this.suscripcionEspecialista = storageService
      .getTurnosByEspecialista(authService.currentUser.email)
      .subscribe((T) => {
        this.turnos = [];
        this.turnos.push(...T);
        if (this.turnosFiltrados.length == 0) {
          this.turnosFiltrados = this.turnos;
        } else {
          this.turnosFiltrados = this.turnos;
          this.filtrarLosTurnos();
        }
      });
  }
  onBtnCancelar(turno: Turno) {
    this.id_turnoActivo = turno.id_turno!;
  }
  onCancelarTurno() {
    this.resenia.motivo = Estados.Cancelado;
    this.storageService.updateEstadoDeUnTurno(
      Estados.Cancelado,
      this.id_turnoActivo,
      [this.resenia]
    );
    this.resenia.comentario = '';
  }
  onCancelarModalCancelar() {
    this.resenia.comentario = '';
  }
  onRechazarTurno(turno: Turno) {
    this.storageService.updateEstadoDeUnTurno(
      Estados.Rechazado,
      turno.id_turno!
    );
  }
  onAceptarTurno(turno: Turno) {
    this.storageService.updateEstadoDeUnTurno(
      Estados.Aceptado,
      turno.id_turno!
    );
  }
  onFinalizarTurno(turno: Turno) {
    this.storageService.updateEstadoDeUnTurno(
      Estados.Finalizado,
      turno.id_turno!
    );
  }
  onVerResenia(turno: Turno, e: any) {
    this.resenia.comentario = turno.resenia![0].comentario;
    this.resenia.motivo = turno.resenia![0].motivo;
  }
  onChangeBusqueda($event: any) {
    this.palabraClave = $event.target.value;
    this.filtrarLosTurnos();
  }
  filtrarLosTurnos() {
    if (this.palabraClave != '') {
      for (let index = 0; index < this.palabraClave.length; index++) {
        if (index == 0) {
          const arr = this.palabraClave.split('');
          arr[0] = this.palabraClave[index].toUpperCase();
          this.palabraClave = arr.join('');
        }
      }
      if (this.adminPanel) {
        this.turnosFiltrados = this.turnos.filter(
          (T) =>
            T.especialidad?.startsWith(this.palabraClave) ||
            T.nombre_especialista?.startsWith(this.palabraClave)
        );
      } else {
        this.turnosFiltrados = this.turnos.filter(
          (T) =>
            T.especialidad?.startsWith(this.palabraClave) ||
            T.nombre_paciente?.startsWith(this.palabraClave)
        );
      }
    } else {
      this.turnosFiltrados = this.turnos;
    }
  }
  ngOnInit(): void {
    if (this.adminPanel) {
      this.suscripcionEspecialista.unsubscribe();
      this.storageService.getTurnos().subscribe((T) => {
        this.turnos = [];
        this.turnos = T;
        if (this.turnosFiltrados.length == 0) {
          this.turnosFiltrados = this.turnos;
        } else {
          this.turnosFiltrados = this.turnos;
          this.filtrarLosTurnos();
        }
      });
    }
  }
}
