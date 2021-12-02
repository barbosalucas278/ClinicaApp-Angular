import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnimateGallery } from 'src/app/animations';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Paciente } from 'src/app/modules/clases/paciente';
import { Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-grilla-pacientes',
  templateUrl: './grilla-pacientes.component.html',
  styleUrls: ['./grilla-pacientes.component.scss'],
  animations: [AnimateGallery],
})
export class GrillaPacientesComponent implements OnInit {
  @Input() adminPanel: boolean = false;
  @Output() showHistoriaClinicaEvent: EventEmitter<Paciente> =
    new EventEmitter();
  @Output() agregarTurnoEvent: EventEmitter<Paciente> = new EventEmitter();
  @Output() showTurnosPacienteEvent: EventEmitter<string> = new EventEmitter();

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
  ) {}
  ngOnInit(): void {
    if (!this.adminPanel) {
      this.cargarTurnos();
      this.cargarPacientes();
    } else {
      this.cargarSoloPacientes();
    }
  }
  cargarSoloPacientes() {
    this.usuariosService.obtenerPacientes().subscribe((P) => {
      this.pacientes = [];
      this.pacientes = P;
      if (this.pacientesFiltrados.length == 0) {
        this.pacientesFiltrados = this.pacientes;
      } else {
        this.pacientesFiltrados = this.pacientes;
        this.filtrarLosPacientes();
      }
    });
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
      const regex = new RegExp('\\b(' + this.palabraClave + ')\\b', 'gi');

      this.pacientesFiltrados = this.pacientes.filter(
        (T) =>
          T.apellido?.startsWith(this.palabraClave) ||
          T.email?.startsWith(this.palabraClave) ||
          regex.test(JSON.stringify(T))
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
  onShowHistoriaClinica(paciente: Paciente) {
    this.showHistoriaClinicaEvent.emit(paciente);
  }
  onAgregarTurno(paciente: Paciente) {
    this.agregarTurnoEvent.emit(paciente);
  }
  onShowTurnosPaciente(email: string) {
    this.showTurnosPacienteEvent.emit(email);
  }
}
