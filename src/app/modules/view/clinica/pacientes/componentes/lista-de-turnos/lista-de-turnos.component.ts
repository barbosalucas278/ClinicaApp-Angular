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
  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {
    this.storageService
      .getTurnosByPaciente(this.authService.currentUser.email)
      .subscribe((T) => {
        setTimeout(() => {
          this.turnosPaciente = T;
        }, 500);
      });
  }

  ngOnInit(): void {}
}
