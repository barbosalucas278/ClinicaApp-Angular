import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { Administrador } from 'src/app/modules/clases/administrador';
import { Especialista } from 'src/app/modules/clases/especialista';
import { Paciente } from 'src/app/modules/clases/paciente';
import { Usuario } from 'src/app/modules/clases/usuario';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit {
  currentUser: any;
  showMisHorarios: boolean;
  showMiPerfil: boolean;
  constructor(
    private usuariosService: UsuarioService,
    private authService: AuthService
  ) {
    this.showMisHorarios = false;
    this.showMiPerfil = false;
    this.currentUser = {};
    setTimeout(() => {
      this.usuariosService
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
  }

  ngOnInit(): void {}
  onShowMisHorarios() {
    this.showMiPerfil = false;
    this.showMisHorarios = true;
  }
  onShowMiPerfil() {
    this.showMisHorarios = false;
    this.showMiPerfil = true;
  }
}
