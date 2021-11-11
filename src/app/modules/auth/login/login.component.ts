import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../clases/usuario';
import { Validaciones } from '../clases/validaciones';
import { AuthService } from '../services/auth/auth.service';
import { UsuarioService } from '../services/auth/usuarios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  accesosRapido: Usuario[];
  mostrarSpinner: boolean;
  urlLogoEmpresa: string = environment.urlImgEmpresa;
  public mostrarError = false;
  mensajeError: string = '';
  formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuariosService: UsuarioService
  ) {
    this.accesosRapido = [
      {
        tipoUsuario: 'paciente',
        email: 'paciente1@paciente.com',
        password: 'paciente123',
        urlImgs: ['usuarios-temp/11111111-1636416118425'],
      },
      {
        tipoUsuario: 'paciente',
        email: 'paciente2@paciente.com',
        password: 'paciente123',
        urlImgs: ['usuarios-temp/22222222-1636416212407'],
      },
      {
        tipoUsuario: 'paciente',
        email: 'paciente3@paciente.com',
        password: 'paciente123',
        urlImgs: ['usuarios-temp/33333333-1636416254088'],
      },
      {
        tipoUsuario: 'especialista',
        email: 'especialista1@especialista.com',
        password: 'especialista123',
        urlImgs: ['usuarios-temp/55555555-1636416559476'],
      },
      {
        tipoUsuario: 'especialista',
        email: 'especialista2@especialista.com',
        password: 'especialista123',
        urlImgs: ['usuarios-temp/44444444-1636416406022'],
      },
      {
        tipoUsuario: 'administrador',
        email: 'barbosalucasroberto@gmail.com',
        password: 'Monte_2021',
        urlImgs: ['usuarios-temp/39485335-1635186344367'],
      },
    ];
    this.mostrarSpinner = false;
    this.formulario = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  llenarFormulario(email: string, password: string) {
    this.formulario.value['email'] = email;
    this.formulario.value['password'] = password;
  }
  onRegistrarse() {
    setTimeout(() => {
      this.router.navigate(['/auth/register']);
    }, 500);
  }
  ngOnInit(): void {}

  public ingresar() {
    this.mostrarSpinner = true;
    const { email, password } = this.formulario.value;

    this.authService
      .signin(email, password)
      .then((usuario) => {
        this.usuariosService.guardarLogin(usuario.user?.email!);
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.mostrarSpinner = false;
        switch (error.code) {
          case 'auth/user-not-found':
            this.mensajeError = `No existe el usuario en nuestro registro`;
            break;
          case 'auth/wrong-password':
            this.mensajeError = `La contraseña es incorrecta`;
            break;
          case 'auth/invalid-email':
            this.mensajeError = `El email debe tener un formato válido`;
            break;
          default:
            this.mensajeError = error.message;
            break;
        }
        this.authService.logout();
        this.mostrarSpinner = false;
        this.mostrarError = true;
        setTimeout(() => {
          this.resetMensajeError();
        }, 2000);
      });
  }
  resetMensajeError() {
    this.mostrarError = false;
    this.mensajeError = '';
  }
}
