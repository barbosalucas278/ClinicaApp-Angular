import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { StorageService } from 'src/app/modules/auth/services/storage/storage.service';
import { Turno } from 'src/app/modules/clases/turno';

@Component({
  selector: 'app-lista-de-turnos',
  templateUrl: './lista-de-turnos.component.html',
  styleUrls: ['./lista-de-turnos.component.scss'],
})
export class ListaDeTurnosComponent implements OnInit {
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

      this.turnosFiltrados = this.turnosPaciente.filter(
        (T) =>
          T.especialidad?.startsWith(palabraClave) ||
          T.nombre_especialista?.startsWith(palabraClave)
      );
    } else {
      this.turnosFiltrados = this.turnosPaciente;
    }
  }
  ngOnInit(): void {}
}
