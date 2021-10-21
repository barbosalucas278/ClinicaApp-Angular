import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Validaciones } from '../clases/validaciones';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  urlLogoEmpresa: string = environment.urlImgEmpresa;
  emailUsuario: string;
  passwordUsuario: string;
  public mostrarError = false;
  formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.emailUsuario = '';
    this.passwordUsuario = '';
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validaciones.validarEmail]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onRegistrarse() {
    setTimeout(() => {
      this.router.navigate(['/auth/register']);
    }, 500);
  }
  ngOnInit(): void {}

  public ingresar() {
    const { email, password } = this.formulario.value;

    this.authService
      .signin(email, password)
      .then((usuario) => {
        console.log("a home");
        
        this.router.navigate(['home']);
      })
      .catch(() => {
        this.mostrarError = true;
      });
  }
}
