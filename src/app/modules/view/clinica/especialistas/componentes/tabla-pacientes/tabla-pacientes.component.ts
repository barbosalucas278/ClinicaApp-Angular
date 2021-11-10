import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Paciente } from 'src/app/modules/clases/paciente';
import { Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss'],
})
export class TablaPAcientesComponent implements OnInit {
  turnos: Turno[] = [];
  palabraClave: string = '';
  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  showAltaHistoriaClinica: boolean = false;
  paciente_activo: Paciente = { tipoUsuario: 'paciente' };
  turno_activo: Turno = {};

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private usuariosService: UsuarioService
  ) {
    this.cargarTurnos();
    this.cargarPacientes();
  }
  cargarPacientes() {
    this.usuariosService.obtenerPacientes().subscribe((P) => {
      this.pacientes = [];
      this.pacientes = P.filter((paciente) =>
        this.turnos.some(
          (T) =>
            T.email_paciente == paciente.email &&
            T.email_especialista == this.authService.currentUser.email
        )
      );
      if (this.pacientesFiltrados.length == 0) {
        this.pacientesFiltrados = this.pacientes;
      } else {
        this.pacientesFiltrados = this.pacientes;
        this.filtrarLosPacientes();
      }
    });
  }
  cargarTurnos() {
    this.storageService
      .getTurnosByEspecialista(this.authService.currentUser.email)
      .subscribe((T) => {
        this.turnos = [];
        this.turnos = T;
      });
  }
  ngOnInit(): void {}
  tieneTurnosSinHistoriaClinica(paciente: Paciente) {
    return this.turnos.some(
      (T) =>
        T.estado == 'finalizado' &&
        T.email_paciente == paciente.email &&
        !T.historiaClinicaCargada
    );
  }
  onChangeBusqueda($event: any) {
    this.palabraClave = $event.target.value;
    this.filtrarLosPacientes();
  }
  filtrarLosPacientes() {
    if (this.palabraClave != '') {
      for (let index = 0; index < this.palabraClave.length; index++) {
        if (index == 0) {
          const arr = this.palabraClave.split('');
          arr[0] = this.palabraClave[index].toUpperCase();
          this.palabraClave = arr.join('');
        }
      }

      this.pacientesFiltrados = this.pacientes.filter(
        (T) =>
          T.apellido?.startsWith(this.palabraClave) ||
          T.email?.startsWith(this.palabraClave)
      );
    } else {
      this.pacientesFiltrados = this.pacientes;
    }
  }
  onDejarHistoriaClinica(paciente: Paciente) {
    this.showAltaHistoriaClinica = true;
    this.paciente_activo = paciente;
    this.turno_activo = this.turnos.filter(
      (T) => T.email_paciente == paciente.email && !T.historiaClinicaCargada
    )[0];
  }
  onCargaHistoriaClinicaEnd() {
    this.showAltaHistoriaClinica = false;
    this.turno_activo = {};
  }
}
