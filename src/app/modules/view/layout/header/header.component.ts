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
        setTimeout(() => {
          this.userService
            .obtenerCurrentUsuario(this.authService.currentUser?.email!)
            .subscribe((userData) => {
              this.userData = userData[0];
              // console.log(userData[0]);
            });
          this.userHasLogged = condition;
        }, 1000);
      } else {
        setTimeout(() => {
          this.userHasLogged = condition;
        }, 1000);
      }
    });
  }
  onLogout() {
    this.authService.logout().then(() => {
      setTimeout(() => {
        this.router.navigate(['auth']);
      }, 500);
    });
  }
  onUsuarios() {
    setTimeout(() => {
      this.router.navigate(['administracion/usuarios']);
    }, 500);
  }
}
