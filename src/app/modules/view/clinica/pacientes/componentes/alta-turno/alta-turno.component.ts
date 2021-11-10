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
  especialidadSeleccionada: Especialidad = {};
  especialistasDisponibles: Especialista[] = [];
  especialistasFiltrados: Especialista[] = [];
  especialistaSeleccionado: Especialista = { tipoUsuario: 'especialista' };
  noHayEspecialistas: boolean = false;

  diaSeleccionado: string = '';
  noHayDiasDisponibles: boolean = false;

  horarioSeleccionado: string = '';
  noHayHorariosDisponibles: boolean = false;
  turnosDisponiles: Turno[] = [];
  matrizTurnosDisponibles: Map<string, string[]> = new Map();
  showAddEspecialista: boolean;
  showAddDia: boolean;
  showAddHorario: boolean;
  checkForm: boolean;

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
    this.checkForm = false;

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
        this.especialidadesDisponibles = [];
        this.especialidadesDisponibles = E;
      }, 1000);
    });
  }
  cargarEspecialistas() {
    this.usuariosServices.obtenerEspecialistas().subscribe((E) => {
      this.especialistasDisponibles = [];
      this.especialistasDisponibles = E;
    });
  }

  ngOnInit(): void {}
  /**
   * EventHandler de cuando el usuario selecicona una especialidad
   * @param especialidad
   * @param $event
   */
  onEspecialidadSeleccionada(especialidad: Especialidad, $event: any) {
    if (
      this.especialidadSeleccionada.detalle != undefined ||
      this.especialistaSeleccionado.dni != undefined ||
      this.diaSeleccionado != '' ||
      this.horarioSeleccionado != ''
    ) {
      this.checkForm = false;
      this.diaSeleccionado = '';
      this.horarioSeleccionado = '';
      this.especialistaSeleccionado = { tipoUsuario: 'especialista' };
      this.especialidadSeleccionada = {};
      this.showAddHorario = false;
      this.showAddDia = false;
      this.showAddEspecialista = false;
      this.noHayHorariosDisponibles = false;
      this.noHayDiasDisponibles = false;
      this.noHayEspecialistas = false;
      const botones =
        $event.target.parentElement.parentNode.parentNode.children;
      for (const boton of botones) {
        if (boton.id != $event.target.parentElement.parentNode.id) {
          boton.classList.remove('visually-hidden');
        }
      }
    } else {
      this.especialidadSeleccionada = especialidad;
      let espeFiltrados: Especialista[] = [];
      let tieneLaEspecialidad = (e: Especialista) => {
        let especialiadesCompletas = e.especialidad!;
        let especialidades = especialiadesCompletas.map(
          (espe) => espe.detalle!
        );
        let especialidadesFiltradas = especialidades!
          .join(',')
          .includes(this.especialidadSeleccionada.detalle!);
        if (especialidadesFiltradas) {
          return e;
        }
        return false;
      };
      espeFiltrados = this.especialistasDisponibles.filter((E) =>
        tieneLaEspecialidad(E)
      );
      this.especialistasFiltrados = espeFiltrados;

      if (espeFiltrados.length == 1) {
        setTimeout(() => {
          this.onEspecialistaSeleccionado(espeFiltrados[0]);
        }, 500);
      }

      const botones =
        $event.target.parentElement.parentNode.parentNode.children;
      for (const boton of botones) {
        if (boton.id != $event.target.parentElement.parentNode.id) {
          boton.classList.add('visually-hidden');
        }
      }
      this.showAddEspecialista = true;
    }
  }

  onEspecialistaSeleccionado(
    especialistaSeleccionado: Especialista,
    $event?: any
  ) {
    if (
      this.especialistaSeleccionado.dni != undefined ||
      this.diaSeleccionado != '' ||
      this.horarioSeleccionado != ''
    ) {
      this.checkForm = false;
      this.diaSeleccionado = '';
      this.horarioSeleccionado = '';
      this.showAddHorario = false;
      this.showAddDia = false;
      this.noHayHorariosDisponibles = false;
      this.noHayDiasDisponibles = false;
      this.especialistaSeleccionado = { tipoUsuario: 'especialista' };
      if ($event) {
        const botones = $event.target.parentElement.parentNode.children;
        for (const boton of botones) {
          if (boton.id != $event.target.parentElement.id) {
            boton.classList.remove('visually-hidden');
          }
        }
      }
    } else {
      this.especialistaSeleccionado = especialistaSeleccionado;

      this.storageService
        .getTurnosByEspecialidad(
          this.especialistaSeleccionado.email!,
          this.especialidadSeleccionada.detalle!
        )
        .subscribe((T) => {
          setTimeout(() => {
            this.turnosDisponiles = [];
            this.turnosDisponiles = T;
          }, 10);
        });
      const especialidadEspecialista =
        especialistaSeleccionado.especialidad!.find(
          (es) => es.detalle == this.especialidadSeleccionada.detalle
        );

      const disponibilidadDesde = especialidadEspecialista?.horarioaDesde
        ? especialidadEspecialista?.horarioaDesde
        : '';
      const disponibilidadHasta = especialidadEspecialista?.horariosHasta
        ? especialidadEspecialista?.horariosHasta
        : '';
      if ($event) {
        const botones = $event.target.parentElement.parentNode.children;
        for (const boton of botones) {
          if (boton.id != $event.target.parentElement.id) {
            boton.classList.add('visually-hidden');
          }
        }
      }

      setTimeout(() => {
        if (disponibilidadDesde === '' && disponibilidadHasta === '') {
          this.noHayDiasDisponibles = true;
          this.showAddDia = true;
        } else {
          this.armarMatriz(disponibilidadDesde!, disponibilidadHasta!);

          this.showAddDia = true;
        }
      }, 1000);
    }
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
  onDiaSeleccionado(dia: string, $event: any) {
    if (this.showAddHorario) {
      this.checkForm = false;
      this.diaSeleccionado = '';
      this.horarioSeleccionado = '';
      this.showAddHorario = false;
      this.noHayHorariosDisponibles = false;
      if ($event != undefined) {
        const botones = $event.target.parentElement.parentNode.children;
        for (const boton of botones) {
          if (boton.id != $event.target.parentElement.id) {
            boton.classList.remove('visually-hidden');
          }
        }
      }
    } else {
      this.diaSeleccionado = dia;
      if ($event != undefined) {
        const botones = $event.target.parentElement.parentNode.children;
        for (const boton of botones) {
          if (boton.id != $event.target.parentElement.id) {
            boton.classList.add('visually-hidden');
          }
        }
      }

      if (this.matrizTurnosDisponibles.get(dia)?.length == 1) {
        setTimeout(() => {
          this.onHorarioSeleccionado(this.matrizTurnosDisponibles.get(dia)![0]);
        }, 500);
      } else if (this.matrizTurnosDisponibles.get(dia)?.length == 0) {
        this.noHayHorariosDisponibles = true;
      }
      this.showAddHorario = true;
    }
  }
  onHorarioSeleccionado(horario: string, $event?: any) {
    if (this.horarioSeleccionado != '') {
      this.horarioSeleccionado = '';
      this.checkForm = false;
      if ($event != undefined) {
        const botones = $event.target.parentElement.parentNode.children;

        for (const boton of botones) {
          if (boton.id != $event.target.parentElement.id) {
            boton.classList.remove('visually-hidden');
          }
        }
      }
    } else {
      this.horarioSeleccionado = horario;

      if ($event != undefined) {
        const botones = $event.target.parentElement.parentNode.children;

        for (const boton of botones) {
          if (boton.id != $event.target.parentElement.id) {
            boton.classList.add('visually-hidden');
          }
        }
      }
      this.checkForm = true;
    }
  }

  onSubmit() {
    this.checkForm = false;
    const emailPaciente = this.emailPacienteInput
      ? this.emailPacienteInput
      : this.authService.currentUser.email;
    const nombrePacienteStorage = `${this.currentPaciente.nombre}, ${this.currentPaciente.apellido}`;
    const nombrePaciente = this.nombrePacienteInput
      ? this.nombrePacienteInput
      : nombrePacienteStorage;

    const nombreEmpecialista = `${this.especialistaSeleccionado.nombre}, ${this.especialistaSeleccionado.apellido}`;
    this.turno.email_paciente = emailPaciente;
    this.turno.estado = Estados.Pendiente;
    this.turno.nombre_paciente = nombrePaciente;
    this.turno.email_especialista = this.especialistaSeleccionado.email;
    this.turno.nombre_especialista = nombreEmpecialista;
    this.turno.id_turno = this.ultimoId + 1;
    this.turno.dia = this.diaSeleccionado;
    this.turno.horario = this.horarioSeleccionado;
    this.turno.especialidad = this.especialidadSeleccionada.detalle;
    this.turno.historiaClinicaCargada = false;
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
