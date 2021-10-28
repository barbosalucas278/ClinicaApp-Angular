import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Administrador } from '../../clases/administrador';
import { Especialista } from '../../clases/especialista';
import { Paciente } from '../../clases/paciente';
import { Validaciones } from '../clases/validaciones';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() adminPanel: boolean;
  mostrarSpinner: boolean;
  urlImgRegisterEmpresa: string;
  imgBtnPaciente: string;
  imgBtnEspecialista: string;
  imgBtnAdministrador: string;
  tipoUsuario: string;

  formularioPaciente: FormGroup;
  usuarioPaciente: Paciente;
  urlImgsPaciente?: File[];
  formularioEspecialista: FormGroup;
  usuarioEspecialista: Especialista;
  urlImgEspecialista?: File[];
  formularioAdministrador: FormGroup;
  usuarioAdministrador: Administrador;
  urlImgAdministrador?: File[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.adminPanel = false;
    this.mostrarSpinner = false;
    this.urlImgRegisterEmpresa = environment.urlImgRegisterEmpresa;
    this.imgBtnPaciente = environment.urlImgPaciente;
    this.imgBtnEspecialista = environment.urlImgEspecialista;
    this.imgBtnAdministrador = environment.urlImgEspecialista;
    this.urlImgsPaciente = [];
    this.urlImgEspecialista = [];
    this.urlImgAdministrador = [];
    this.usuarioPaciente = { urlImgs: [], tipoUsuario: 'paciente' };
    this.usuarioEspecialista = { urlImgs: [], tipoUsuario: 'especialista' };
    this.usuarioAdministrador = { urlImgs: [], tipoUsuario: 'administrador' };
    this.tipoUsuario = '';
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
    this.formularioAdministrador = this.fb.group({
      nombre: ['', [Validators.required, Validaciones.validarNombre]],
      apellido: ['', [Validators.required, Validaciones.validarApellido]],
      edad: [
        '',
        [Validators.required, Validators.min(18), Validators.max(110)],
      ],
      dni: ['', [Validators.required, Validaciones.validarDni]],
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
          this.mostrarSpinner = true;
          setTimeout(() => {
            if (!this.adminPanel) {
              this.authService.logout();
              this.router.navigate(['auth']);
            } else {
              this.onVolverSeleccionTipuUsuario();
            }
          }, 1500);
        });
    } else if (this.tipoUsuario == 'especialista') {
      const { nombre, apellido, email, edad, dni, password, especialidad } =
        this.formularioEspecialista.value;
      this.usuarioEspecialista.nombre = nombre;
      this.usuarioEspecialista.apellido = apellido;
      this.usuarioEspecialista.email = email;
      this.usuarioEspecialista.edad = edad;
      this.usuarioEspecialista.dni = dni;
      this.usuarioEspecialista.password = password;
      this.usuarioEspecialista.especialidad = especialidad;
      this.usuarioEspecialista.aprobado = false;

      this.authService
        .register(this.usuarioEspecialista, this.urlImgEspecialista!)
        .then(() => {
          this.mostrarSpinner = true;
          setTimeout(() => {
            if (!this.adminPanel) {
              this.authService.logout();
              this.router.navigate(['auth']);
            } else {
              this.onVolverSeleccionTipuUsuario();
            }
          }, 1500);
        });
    } else {
      const { nombre, apellido, email, edad, dni, password } =
        this.formularioAdministrador.value;
      this.usuarioAdministrador.nombre = nombre;
      this.usuarioAdministrador.apellido = apellido;
      this.usuarioAdministrador.email = email;
      this.usuarioAdministrador.edad = edad;
      this.usuarioAdministrador.dni = dni;
      this.usuarioAdministrador.password = password;
      this.authService
        .register(this.usuarioAdministrador, this.urlImgAdministrador!)
        .then(() => {
          this.mostrarSpinner = true;
          setTimeout(() => {
            if (!this.adminPanel) {
              this.authService.logout();
              this.router.navigate(['auth']);
            } else {
              this.onVolverSeleccionTipuUsuario();
            }
          }, 1500);
        });
    }
  }
  onVolver() {
    setTimeout(() => {
      this.router.navigate(['auth']);
    }, 500);
  }
  onPaciente() {
    this.mostrarSpinner = true;
    this.tipoUsuario = 'paciente';
    setTimeout(() => {
      this.mostrarSpinner = false;
    }, 500);
  }
  onEspecialista() {
    this.mostrarSpinner = true;
    this.tipoUsuario = 'especialista';
    setTimeout(() => {
      this.mostrarSpinner = false;
    }, 500);
  }
  onAdministrador() {
    this.mostrarSpinner = true;
    this.tipoUsuario = 'administrador';
    setTimeout(() => {
      this.mostrarSpinner = false;
    }, 500);
  }
  resetFormulario() {
    this.formularioEspecialista.reset();
    this.formularioPaciente.reset();
  }
  onVolverSeleccionTipuUsuario() {
    this.mostrarSpinner = true;
    this.tipoUsuario = '';
    this.resetFormulario();
    setTimeout(() => {
      this.mostrarSpinner = false;
    }, 500);
  }
  onFileChangePaciente($event: any) {
    if ($event.target.files) {
      for (const file in $event.target.files) {
        if (Object.prototype.hasOwnProperty.call($event.target.files, file)) {
          const element: any = $event.target.files[file];

          if (element.type == 'image/jpeg' || element.type == 'image/jpg') {
            if (this.tipoUsuario == 'paciente') {
              this.urlImgsPaciente?.push(element);
            } else if (this.tipoUsuario == 'especialista') {
              this.urlImgEspecialista?.push(element);
            } else {
              this.urlImgAdministrador?.push(element);
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
