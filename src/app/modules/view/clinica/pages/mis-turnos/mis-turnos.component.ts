import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { Administrador } from 'src/app/modules/clases/administrador';
import { Especialista } from 'src/app/modules/clases/especialista';
import { Paciente } from 'src/app/modules/clases/paciente';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit {
  showAltaTurno: boolean = false;
  showMisTurnos: boolean;
  mostrarSpinner: boolean;
  currentUser: any;
  constructor(
    private authService: AuthService,
    private userService: UsuarioService
  ) {
    this.currentUser = {};
    this.mostrarSpinner = true;
    setTimeout(() => {
      this.userService
        .obtenerCurrentUsuario(this.authService.currentUser.email)
        .pipe(
          map<any, any>((user) => {
            switch (user[0].tipoUsuario) {
              case 'especialista':
                const currentEspecialista: Especialista = {
                  nombre: user[0].nombre,
                  apellido: user[0].apellido,
                  dni: user[0].dni,
                  edad: user[0].edad,
                  email: user[0].email,
                  urlImgs: user[0].urlImgs!,
                  especialidad: user[0].especialidad!,
                  tipoUsuario: 'especialista',
                };
                return currentEspecialista;
              case 'paciente':
                const currentPaciente: Paciente = {
                  nombre: user[0].nombre,
                  apellido: user[0].apellido,
                  dni: user[0].dni,
                  edad: user[0].edad,
                  email: user[0].email,
                  urlImgs: user[0].urlImgs!,
                  obraSocial: user[0].obraSocial!,
                  tipoUsuario: 'paciente',
                };
                return currentPaciente;
              case 'administrador':
                const currentAdmin: Administrador = {
                  nombre: user[0].nombre,
                  apellido: user[0].apellido,
                  dni: user[0].dni,
                  edad: user[0].edad,
                  email: user[0].email,
                  urlImgs: user[0].urlImgs,
                  tipoUsuario: 'administrador',
                };
                return currentAdmin;
              default:
                return null;
            }
          })
        )
        .subscribe((current) => {
          this.currentUser.nombre = current.nombre;
          this.currentUser.apellido = current.apellido;
          this.currentUser.dni = current.dni;
          this.currentUser.edad = current.edad;
          this.currentUser.email = current.email;
          this.currentUser.urlImgs = current.urlImgs;
          if (current.tipoUsuario == 'especialista') {
            this.currentUser.especialidad = current.especialidad;
          } else if (current.tipoUsuario == 'paciente') {
            this.currentUser.obraSocial = current.obraSocial;
          }
          this.currentUser.tipoUsuario = current.tipoUsuario;
        });
    }, 800);
    this.mostrarSpinner = false;
    this.showMisTurnos = true;
  }

  ngOnInit(): void {}
  onShowAltaTurno() {
    this.mostrarSpinner = true;
    setTimeout(() => {
      this.showMisTurnos = false;
      this.mostrarSpinner = false;
      this.showAltaTurno = true;
    }, 1000);
  }
  onShowMisTurnos() {
    this.mostrarSpinner = true;
    setTimeout(() => {
      this.mostrarSpinner = false;
      this.showAltaTurno = false;
      this.showMisTurnos = true;
    }, 1000);
  }
}
