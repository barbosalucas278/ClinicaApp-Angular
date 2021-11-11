import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Turno } from 'src/app/modules/clases/turno';

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
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
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
        }, 500);
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
  ngOnInit(): void {}
}
