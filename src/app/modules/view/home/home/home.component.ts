import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.userService
        .obtenerCurrentUsuario(this.authService.currentUser?.email!)
        .subscribe((userData) => {
          console.log(userData);
        });
    }, 500);
  }
}
