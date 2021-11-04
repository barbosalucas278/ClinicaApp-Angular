import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { Paciente } from 'src/app/modules/clases/paciente';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.scss'],
})
export class UsuariosAdminComponent implements OnInit {
  emailPaciente: string;
  mostrarSpinner: boolean;
  showAltaTurno: boolean;
  usuarios: any[];
  usuariosFiltrados: any[];
  tablaActiva: string;
  showRegistrar: boolean;
  constructor(
    private userService: UsuarioService,
    private authService: AuthService
  ) {
    this.showAltaTurno = false;
    this.showRegistrar = false;
    this.mostrarSpinner = false;
    this.usuarios = [];
    this.usuariosFiltrados = [];
    this.tablaActiva = '';
    this.emailPaciente = '';
  }

  ngOnInit(): void {
    this.userService.obtenerUsuarios().subscribe((users) => {
      const arrayUsuarios: any[] = [];
      for (const user of users) {
        arrayUsuarios.push(user);
      }
      this.usuarios = arrayUsuarios;
      this.actualizarTabla();
    });
  }
  showTablaPacientes() {
    this.tablaActiva = 'paciente';
    this.actualizarTabla();
  }
  showTablaEspecialistas() {
    this.tablaActiva = 'especialista';
    this.actualizarTabla();
  }
  showTablaAdministradores() {
    this.tablaActiva = 'administrador';
    this.actualizarTabla();
  }
  showCrearUsuario() {
    this.tablaActiva = '';
    this.showRegistrar = true;
  }
  cancelarCrearUsuario() {
    this.tablaActiva = 'paciente';
    this.actualizarTabla();
    this.showRegistrar = false;
  }
  private actualizarTabla() {
    this.usuariosFiltrados = this.usuarios.filter(
      (x) => x.tipoUsuario === this.tablaActiva
    );
  }
  onHabilitarEspecialista(email: string, index: number, e: any) {
    this.mostrarSpinner = true;
    const spinner = document.getElementById(`${index}EspecialistaAdmin`);
    e.target.parentElement.setAttribute('hidden', true);

    spinner?.attributes.removeNamedItem('hidden');
    this.authService.funcionHabilitarEspecialista(email, true);

    setTimeout(() => {
      this.mostrarSpinner = false;
    }, 1000);
  }
  onInhabilitarEspecialista(email: string, index: number, e: any) {
    this.mostrarSpinner = true;
    const spinner = document.getElementById(`${index}EspecialistaAdmin`);
    e.target.parentElement.setAttribute('hidden', true);

    spinner?.attributes.removeNamedItem('hidden');
    this.authService.funcionHabilitarEspecialista(email, false);

    setTimeout(() => {
      this.mostrarSpinner = false;
    }, 1000);
  }
  onAgregarTurno(paciente: Paciente) {
    this.showAltaTurno = true;
  }
  onProcesoDeAltaTerminado() {
    this.showAltaTurno = false;
  }
  cancelarAgregarTurno() {
    this.showAltaTurno = false;
  }
}
