import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { Usuario } from 'src/app/modules/clases/usuario';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.scss'],
})
export class UsuariosAdminComponent implements OnInit {
  usuarios: any[];
  constructor(private userService: UsuarioService) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.userService.obtenerUsuarios().subscribe((users) => {
      for (const user of users) {
        if (user.tipoUsuario == 'paciente') {
          this.usuarios.push(user)
        }
      }
    });
  }
}
