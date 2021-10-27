import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  urlImgHome: string;
  constructor(
    private userService: UsuarioService,
    private authService: AuthService
  ) {
    this.urlImgHome = environment.urlImgHome;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.userService
        .obtenerCurrentUsuario(this.authService.currentUser?.email!)
        .subscribe((userData) => {
        });
    }, 500);
  }
}
