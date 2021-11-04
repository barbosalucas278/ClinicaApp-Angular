import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Especialidad } from 'src/app/modules/clases/especialidad';
import { Especialista } from 'src/app/modules/clases/especialista';
import { Paciente } from 'src/app/modules/clases/paciente';
import { Estados, Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss'],
})
export class AltaTurnoComponent implements OnInit {
  @Input() emailPacienteInput?: string;
  @Input() nombrePacienteInput?: string;
  @Output() procesoDeAltaTerminado: EventEmitter<boolean> = new EventEmitter();

  currentPaciente: Paciente = { tipoUsuario: 'paciente' };
  especialidadesDisponibles: Especialidad[] = [];
  especialistasDisponibles: Especialista[] = [];
  especialistasFiltrados: Especialista[] = [];
  turnosDisponiles: Turno[] = [];
  matrizTurnosDisponibles: Map<string, string[]> = new Map();
  showAddEspecialista: boolean;
  showAddDia: boolean;
  showAddHorario: boolean;
  formularioTurno: FormGroup;
  checkForm: boolean = false;
  turno: Turno = { resenia: [] };
  ultimoId: number = 0;
  mensaje: string = '';
  mostrarMensaje: boolean = false;
  tipoAlerta: string = '';
  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private usuariosServices: UsuarioService,
    private authService: AuthService
  ) {
    this.showAddEspecialista = false;
    this.showAddDia = false;
    this.showAddHorario = false;
    this.formularioTurno = this.fb.group({
      especialidad: ['', Validators.required],
      especialista: ['', Validators.required],
      dia: ['', Validators.required],
      horario: ['', Validators.required],
    });
    this.disabledAllContorls();
    this.cargarEspecialidades();
    this.cargarEspecialistas();
    this.cargarUltimoIdTurno();
    this.usuariosServices
      .obtenerCurrentUsuario(this.authService.currentUser.email)
      .subscribe((U) => (this.currentPaciente = U[0]));
  }
  cargarEspecialidades() {
    this.storageService.getEspecialidades().subscribe((E) => {
      setTimeout(() => {
        this.especialidadesDisponibles.push(...E);
      }, 1000);
    });
  }
  cargarEspecialistas() {
    this.usuariosServices.obtenerEspecialistas().subscribe((E) => {
      setTimeout(() => {
        this.especialistasDisponibles.push(...E);
      }, 1000);
    });
  }

  disabledAllContorls() {
    const controles = this.formularioTurno.controls;
    for (const control in controles) {
      if (Object.prototype.hasOwnProperty.call(controles, control)) {
        const element = controles[control];
        element.disable();
      }
    }
  }
  ngOnInit(): void {}

  onEspecialidadSeleccionada(especialidadSeleccionada: Especialidad) {
    this.formularioTurno.reset();
    this.showAddDia = false;
    this.formularioTurno.controls['especialidad'].setValue(
      especialidadSeleccionada.detalle
    );

    this.especialistasFiltrados = this.especialistasDisponibles.filter((E) =>
      E.especialidad?.some(
        (espe) => espe.detalle === especialidadSeleccionada.detalle
      )
    );
    this.turno.especialidad = especialidadSeleccionada.detalle;
    this.showAddEspecialista = true;
  }
  onEspecialistaSeleccionado(especialistaSeleccionado: Especialista) {
    this.formularioTurno.controls['dia'].reset();
    this.formularioTurno.controls['horario'].reset();
    this.formularioTurno.controls['especialista'].setValue(
      `${especialistaSeleccionado.nombre}, ${especialistaSeleccionado.apellido}`
    );

    this.turno.email_especialista = especialistaSeleccionado.email;
    this.turno.nombre_especialista = `${especialistaSeleccionado.nombre}, ${especialistaSeleccionado.apellido}`;
    this.storageService
      .getTurnosByEspecialidad(
        especialistaSeleccionado.email!,
        this.formularioTurno.controls['especialidad'].value
      )
      .subscribe((T) => {
        setTimeout(() => {
          this.turnosDisponiles.push(...T);
        }, 1000);
      });

    const especialidadEspecialista =
      especialistaSeleccionado.especialidad?.filter(
        (es) =>
          (es.detalle = this.formularioTurno.controls['especialidad'].value)
      )[0];
    const disponibilidadDesde = especialidadEspecialista?.horarioaDesde;
    const disponibilidadHasta = especialidadEspecialista?.horariosHasta;

    setTimeout(() => {
      this.armarMatriz(disponibilidadDesde!, disponibilidadHasta!);
      this.showAddDia = true;
    }, 2000);
  }
  /**
   * Arma la matriz de horarios disponibles del especialista
   * @param disponibilidadDesde Disponibilidad inicial del especialista
   * @param disponibilidadHasta Disponibilidad final del especialista
   */
  armarMatriz(disponibilidadDesde: string, disponibilidadHasta: string) {
    const fechaDeHoy = moment();
    const disponibilidadEspecialistaDesde = moment(
      disponibilidadDesde,
      'hh:mm'
    );
    const disponibilidadEspecialistaHasta = moment(
      disponibilidadHasta,
      'hh:mm'
    );
    const cantidadDeDiasApartirDeHoy = 15;
    for (let i = 0; i < cantidadDeDiasApartirDeHoy; i++) {
      const sabado = 6;
      const horarioApertura = moment('08:00', 'hh:mm');
      const horarioCierre = moment('19:00', 'hh:mm');
      const horarioCierreSabados = moment('14:00', 'hh:mm');
      let fecha = fechaDeHoy.add(1, 'day');
      let arrHorarios: string[] = [];
      if (fecha.get('day') == sabado) {
        while (horarioApertura < horarioCierreSabados) {
          let newHorario = horarioApertura.add(30, 'm');
          if (
            newHorario > disponibilidadEspecialistaDesde &&
            newHorario < disponibilidadEspecialistaHasta
          ) {
            arrHorarios.push(newHorario.format('HH:mm'));
          }
        }
      } else {
        while (horarioApertura < horarioCierre) {
          let newHorario = horarioApertura.add(30, 'm');

          if (
            newHorario > disponibilidadEspecialistaDesde &&
            newHorario < disponibilidadEspecialistaHasta
          ) {
            arrHorarios.push(newHorario.format('HH:mm'));
          }
        }
      }
      let arrayHorariosFiltrados = arrHorarios.filter(
        (horario) =>
          !this.turnosDisponiles.some(
            (turno) =>
              turno.dia === fecha.format('DD-MM') && turno.horario === horario
          )
      );

      this.matrizTurnosDisponibles.set(
        fecha.format('DD-MM'),
        arrayHorariosFiltrados
      );
    }
  }
  onDiaSeleccionado(dia: string, horario: string) {
    this.checkForm = true;
    this.formularioTurno.controls['dia'].setValue(dia);
    this.formularioTurno.controls['horario'].setValue(horario);

    this.turno.dia = dia;
    this.turno.horario = horario;
  }

  onSubmit() {
    const emailPaciente = this.emailPacienteInput
      ? this.emailPacienteInput
      : this.authService.currentUser.email;
    const nombrePacienteStorage = `${this.currentPaciente.nombre}, ${this.currentPaciente.apellido}`;
    const nombrePaciente = this.nombrePacienteInput
      ? this.nombrePacienteInput
      : nombrePacienteStorage;
    this.turno.email_paciente = emailPaciente;
    this.turno.estado = Estados.Pendiente;
    this.turno.nombre_paciente = nombrePaciente;
    this.turno.id_turno = this.ultimoId + 1;
    this.storageService
      .createTurno(this.turno)
      .then(() => {
        this.tipoAlerta = 'alert-success';
        this.mensaje = 'Se ha cargado el turno correctamente';
        this.mostrarMensaje = true;
        setTimeout(() => {
          this.mostrarMensaje = false;
          this.procesoDeAltaTerminado.emit(true);
        }, 2000);
      })
      .catch((error: Error) => {
        this.tipoAlerta = 'alert-danger';
        this.mensaje = error.message;
        this.mostrarMensaje = true;
        setTimeout(() => {
          this.mostrarMensaje = false;
          this.procesoDeAltaTerminado.emit(true);
        }, 2000);
      });
  }
  private cargarUltimoIdTurno() {
    this.storageService.getUltimoTurno().subscribe((T) => {
      this.ultimoId = T[0].id_turno!;
    });
  }
}
