import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paciente } from 'src/app/modules/clases/paciente';
import { Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-paciente-card',
  templateUrl: './paciente-card.component.html',
  styleUrls: ['./paciente-card.component.scss'],
})
export class PacienteCardComponent implements OnInit {
  @Input() adminPanel: boolean = false;
  @Input() tieneTurnosSinHistoriaClinica: boolean = false;
  @Input() paciente?: Paciente;
  @Input() ultimosTurnos?: Turno[];
  @Output() dejarHistoriaClinicaEvent: EventEmitter<Paciente> =
    new EventEmitter();
  @Output() showHistoriaClinicaEvent: EventEmitter<Paciente> =
    new EventEmitter();
  @Output() agregarTurnoEvent: EventEmitter<Paciente> = new EventEmitter();
  @Output() showTurnosPacienteEvent: EventEmitter<string> = new EventEmitter();
  showPortada: boolean = true;
  showHistoriaClinica: boolean = false;
  turnoActivo?: Turno;
  constructor() {}
  onDejarHistoriaClinica() {
    this.dejarHistoriaClinicaEvent.emit(this.paciente);
  }
  onShowHistoriaClinica(turno?: Turno) {
    if (!this.adminPanel) {
      this.turnoActivo = turno;
      this.showPortada = false;
      this.showHistoriaClinica = true;
    } else {
      this.showHistoriaClinicaEvent.emit(this.paciente);
    }
  }
  onVolver() {
    this.turnoActivo = undefined;
    this.showHistoriaClinica = false;
    this.showPortada = true;
  }
  onAgregarTurno() {
    this.agregarTurnoEvent.emit(this.paciente);
  }
  onVerTurnos() {
    this.showTurnosPacienteEvent.emit(this.paciente?.email);
  }
  ngOnInit(): void {}
}
