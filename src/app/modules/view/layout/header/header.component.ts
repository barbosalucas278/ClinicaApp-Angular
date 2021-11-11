import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { Usuario } from 'src/app/modules/clases/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userData?: Usuario;
  userHasLogged: boolean;
  urlLogoEmpresa: string;
  nombreEmpresa: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsuarioService
  ) {
    this.userHasLogged = false;
    this.nombreEmpresa = environment.nombreEmpresa;
    this.urlLogoEmpresa = environment.urlImgLogoEmpresa;
  }

  ngOnInit(): void {
    this.authService.statusUserChangedEvent.subscribe((condition) => {
      //Evaluo la candicion del logeo del usuario para setear bien la animacion de la aparicion del header
      //si recien entra, que tarde 1 seg mas(tiempo que transcurre en el guard para no leer datos null)
      //que cuando deslogea
      if (condition) {
        setTimeout(async () => {
          this.userHasLogged = condition;
          const token = await this.authService.currentUser.getIdTokenResult();
          if (token.claims['especialista']) {
            this.userData = { tipoUsuario: 'especialista' };
          } else if (token.claims['administrador']) {
            this.userData = { tipoUsuario: 'administrador' };
          } else if (token.claims['paciente']) {
            this.userData = { tipoUsuario: 'paciente' };
          }
        }, 1000);
      } else {
        this.userHasLogged = condition;
      }
    });
  }
  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(['auth']);
    });
  }
  onUsuarios() {
    setTimeout(() => {
      this.router.navigate(['administracion/usuarios']);
    }, 500);
  }
  onTurnos() {
    setTimeout(() => {
      this.router.navigate(['administracion/turnos']);
    }, 500);
  }
  onInformes() {
    setTimeout(() => {
      this.router.navigate(['administracion/informes']);
    }, 500);
  }
  onMiPerfil() {
    setTimeout(() => {
      this.router.navigate(['clinica/miperfil']);
    }, 500);
  }
  onPacientes() {
    setTimeout(() => {
      this.router.navigate(['clinica/pacientes']);
    }, 500);
  }
  onMisTurnos() {
    setTimeout(() => {
      this.router.navigate(['clinica/misturnos']);
    }, 500);
  }
}
