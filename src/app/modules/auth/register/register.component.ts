import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Especialista } from '../../clases/especialista';
import { Paciente } from '../../clases/paciente';
import { StorageService } from '../services/storage/storage.service';
import { Validaciones } from '../clases/validaciones';
import { AuthService } from '../services/auth/auth.service';
import { UsuarioService } from '../services/auth/usuarios/usuarios.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  urlImgRegisterEmpresa: string;
  tipoUsuario: string;

  formularioPaciente: FormGroup;
  usuarioPaciente: Paciente;
  urlImgsPaciente?: File[];
  formularioEspecialista: FormGroup;
  usuarioEspecialista: Especialista;
  urlImgEspecialista?: File[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.urlImgEspecialista = [];
    this.urlImgsPaciente = [];
    this.usuarioPaciente = { urlImgs: [], tipoUsuario: 'paciente' };
    this.usuarioEspecialista = { urlImgs: [], tipoUsuario: 'especialista' };
    this.urlImgRegisterEmpresa = environment.urlImgRegisterEmpresa;
    this.tipoUsuario = 'paciente';
    this.formularioPaciente = this.fb.group({
      nombre: ['', [Validators.required, Validaciones.validarNombre]],
      apellido: ['', [Validators.required, Validaciones.validarApellido]],
      edad: [
        '',
        [Validators.required, Validators.min(18), Validators.max(110)],
      ],
      dni: ['', [Validators.required, Validaciones.validarDni]],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validaciones.validarEmail]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      urlImgs: ['', [Validators.required, Validaciones.validarImg]],
    });
    this.formularioEspecialista = this.fb.group({
      nombre: ['', [Validators.required, Validaciones.validarNombre]],
      apellido: ['', [Validators.required, Validaciones.validarApellido]],
      edad: [
        '',
        [Validators.required, Validators.min(18), Validators.max(110)],
      ],
      dni: ['', [Validators.required, Validaciones.validarDni]],
      especialidad: ['', Validators.required],
      email: ['', [Validators.required, Validaciones.validarEmail]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      urlImg: ['', [Validators.required, Validaciones.validarImg]],
    });
  }

  ngOnInit(): void {}

  ngOnChanges() {}
  onSubmit() {
    if (this.tipoUsuario == 'paciente') {
      const { nombre, apellido, email, edad, dni, password, obraSocial } =
        this.formularioPaciente.value;
      this.usuarioPaciente.nombre = nombre;
      this.usuarioPaciente.apellido = apellido;
      this.usuarioPaciente.email = email;
      this.usuarioPaciente.edad = edad;
      this.usuarioPaciente.dni = dni;
      this.usuarioPaciente.password = password;
      this.usuarioPaciente.obraSocial = obraSocial;

      this.authService
        .register(this.usuarioPaciente, this.urlImgsPaciente!)
        .then(() => {
          console.log("a home");
          this.router.navigate(['home']);
        });
    } else {
      const { nombre, apellido, email, edad, dni, password, especialidad } =
        this.formularioEspecialista.value;
      this.usuarioEspecialista.nombre = nombre;
      this.usuarioEspecialista.apellido = apellido;
      this.usuarioEspecialista.email = email;
      this.usuarioEspecialista.edad = edad;
      this.usuarioEspecialista.dni = dni;
      this.usuarioEspecialista.password = password;
      this.usuarioEspecialista.especialidad = especialidad;

      this.authService
        .register(this.usuarioEspecialista, this.urlImgEspecialista!)
        .then(() => {
          console.log("a home");
          
          this.router.navigate(['home']);
        });
    }
  }
  onVolver() {
    setTimeout(() => {
      this.router.navigate(['auth']);
    }, 500);
  }
  resetFormulario() {
    this.formularioEspecialista.reset();
    this.formularioPaciente.reset();
  }
  onFileChangePaciente($event: any) {
    if ($event.target.files) {
      for (const file in $event.target.files) {
        if (Object.prototype.hasOwnProperty.call($event.target.files, file)) {
          const element: any = $event.target.files[file];

          if (element.type == 'image/jpeg' || element.type == 'image/png') {
            if (this.tipoUsuario == 'paciente') {
              this.urlImgsPaciente?.push(element);
            } else {
              this.urlImgEspecialista = element;
            }
          } else {
            if (this.tipoUsuario == 'paciente') {
              this.formularioPaciente.get('urlImgs')!.updateValueAndValidity();
            } else {
              this.formularioEspecialista
                .get('urlImg')!
                .updateValueAndValidity();
            }
          }
        }
      }
    }
  }
}
