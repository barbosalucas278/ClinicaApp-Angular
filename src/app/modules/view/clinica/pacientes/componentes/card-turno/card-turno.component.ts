import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() accionTurnoEvent: EventEmitter<Turno> = new EventEmitter();
  constructor(private storageService: StorageService) {}
  exponerTurno() {
    this.accionTurnoEvent.emit(this.turno);
  }
  ngOnInit(): void {}
}
