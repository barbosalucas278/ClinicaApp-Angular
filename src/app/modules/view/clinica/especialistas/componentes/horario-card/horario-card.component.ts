import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Especialidad } from 'src/app/modules/clases/especialidad';

@Component({
  selector: 'app-horario-card',
  templateUrl: './horario-card.component.html',
  styleUrls: ['./horario-card.component.scss'],
})
export class HorarioCardComponent implements OnInit {
  @Input() especialidad: Especialidad;
  @Output() horarioEstablecidoEvent: EventEmitter<Especialidad> =
    new EventEmitter();
  desde: string;
  hasta: string;
  constructor() {
    this.especialidad = {};
    this.desde = '00:00';
    this.hasta = '00:00';
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.desde = this.especialidad
        ? this.especialidad.horarioaDesde!
        : '00:00';
      this.hasta = this.especialidad
        ? this.especialidad.horariosHasta!
        : '00:00';
    }, 500);
  }
  onEstablecer() {
    this.especialidad.horarioaDesde = this.desde;
    this.especialidad.horariosHasta = this.hasta;
    this.horarioEstablecidoEvent.emit(this.especialidad);
  }
}
