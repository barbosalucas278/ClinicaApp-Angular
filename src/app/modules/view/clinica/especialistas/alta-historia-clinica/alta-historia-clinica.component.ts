import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Especialista } from 'src/app/modules/clases/especialista';
import { HistoriaClinica } from 'src/app/modules/clases/historia-clinica';
import { HistoriaEspecifica } from 'src/app/modules/clases/historia-especifica';
import { Paciente } from 'src/app/modules/clases/paciente';
import { Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-alta-historia-clinica',
  templateUrl: './alta-historia-clinica.component.html',
  styleUrls: ['./alta-historia-clinica.component.scss'],
})
export class AltaHistoriaClinicaComponent implements OnInit {
  @Input() turno: Turno = {};
  @Input() paciente: Paciente = { tipoUsuario: 'paciente' };
  @Output() procesoDeAltaTerminado: EventEmitter<boolean> = new EventEmitter();
  historiaClinica: HistoriaClinica = {};
  formularioHistoriaClinica: FormGroup;
  formCheck: boolean = true;
  showExtra1: boolean;
  extra1: string = '';
  deta1: string = '';
  showExtra2: boolean;
  extra2: string = '';
  deta2: string = '';
  showExtra3: boolean;
  extra3: string = '';
  deta3: string = '';
  showExtra4: boolean;
  extra4: string = '';
  deta4: string = '';
  showExtra5: boolean;
  extra5: string = '';
  deta5: string = '';
  showExtra6: boolean;
  extra6: string = '';
  deta6: string = '';
  constructor(
    private userService: UsuarioService,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.historiaClinica.historiasEspecificas = [];
    this.showExtra1 = true;
    this.showExtra2 = true;
    this.showExtra3 = true;
    this.showExtra4 = true;
    this.showExtra5 = true;
    this.showExtra6 = true;

    this.formularioHistoriaClinica = this.fb.group({
      altura: [, Validators.required],
      peso: [, Validators.required],
      temperatura: [, Validators.required],
      presion: [, Validators.required],
    });
  }
  onShowExtra2() {
    this.showExtra2 = true;
  }
  onCleanExtra2() {
    this.extra2 = '';
    this.deta2 = '';
    this.showExtra2 = false;
  }
  onShowExtra3() {
    this.showExtra1 = false;
    this.showExtra3 = true;
  }
  onCleanExtra3() {
    this.extra3 = '';
    this.deta3 = '';
    this.showExtra3 = false;
  }
  onShowExtra4() {
    this.showExtra4 = true;
  }
  onCleanExtra4() {
    this.extra4 = '';
    this.deta4 = '';
    this.showExtra4 = false;
  }
  onShowExtra5() {
    this.showExtra5 = true;
  }
  onCleanExtra5() {
    this.extra5 = '';
    this.deta5 = '';
    this.showExtra5 = false;
  }
  onShowExtra6() {
    this.showExtra6 = true;
  }
  onCleanExtra6() {
    this.extra6 = '';
    this.deta6 = '';
    this.showExtra6 = false;
  }

  onSubmit() {
    this.formCheck = false;
    const { altura, peso, temperatura, presion } =
      this.formularioHistoriaClinica.value;
    this.historiaClinica.altura = altura;
    this.historiaClinica.peso = peso;
    this.historiaClinica.temperatura = temperatura;
    this.historiaClinica.presion = presion;
    const newHistoriaEspecifica: HistoriaEspecifica = {
      especificaciones: [],
    };
    if (this.deta1 != '' && this.extra1 != '') {
      newHistoriaEspecifica.especialista = this.turno.nombre_especialista;
      newHistoriaEspecifica.fecha = moment().format('DD/MM/yyyy');
      newHistoriaEspecifica.especialidad = this.turno.especialidad;
      newHistoriaEspecifica.especificaciones?.push({
        detalle: this.deta1,
        dato: this.extra1,
      });
    }
    if (this.deta2 != '' && this.extra2 != '') {
      newHistoriaEspecifica.especificaciones?.push({
        detalle: this.deta2,
        dato: this.extra2,
      });
    }
    if (this.deta3 != '' && this.extra3 != '') {
      newHistoriaEspecifica.especificaciones?.push({
        detalle: this.deta3,
        dato: this.extra3,
      });
    }
    if (this.deta4 != '' && this.extra4 != '') {
      newHistoriaEspecifica.especificaciones?.push({
        detalle: this.deta4,
        dato: this.extra4,
      });
    }
    if (this.deta5 != '' && this.extra5 != '') {
      newHistoriaEspecifica.especificaciones?.push({
        detalle: this.deta5,
        dato: this.extra5,
      });
    }
    if (this.deta6 != '' && this.extra6 != '') {
      let valor6: string = 'no';
      if (this.extra6) {
        valor6 = 'si';
      }
      newHistoriaEspecifica.especificaciones?.push({
        detalle: this.deta6,
        dato: valor6,
      });
    }

    this.historiaClinica.historiasEspecificas?.push(newHistoriaEspecifica);

    this.storageService.guardarHistoriaClinica(
      this.turno.email_paciente!,
      this.historiaClinica
    );

    this.storageService.guardarEstadoHistoriaClinicaEnTurno(
      this.turno.id_turno!,
      this.historiaClinica
    );
    setTimeout(() => {
      this.procesoDeAltaTerminado.emit(true);
    }, 1500);
  }
  onCancelar() {
    this.procesoDeAltaTerminado.emit(true);
  }
  ngOnInit(): void {
    this.formularioHistoriaClinica.controls['altura'].setValue(
      this.paciente.historiaClinica!?.altura
    );
    this.formularioHistoriaClinica.controls['peso'].setValue(
      this.paciente.historiaClinica!?.peso
    );
    this.formularioHistoriaClinica.controls['temperatura'].setValue(
      this.paciente.historiaClinica!?.temperatura
    );
    this.formularioHistoriaClinica.controls['presion'].setValue(
      this.paciente.historiaClinica!?.presion
    );
  }
}
