import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { UsuarioService } from 'src/app/modules/auth/services/auth/usuarios/usuarios.service';
import { Paciente } from 'src/app/modules/clases/paciente';
import * as moment from 'moment';
import { Papa } from 'ngx-papaparse';
import { AnimateGallery } from 'src/app/animations';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.scss'],
  animations: [AnimateGallery],
})
export class UsuariosAdminComponent implements OnInit {
  emailPaciente: string;
  nombrePaciente: string;
  mostrarSpinner: boolean;
  showAltaTurno: boolean;
  usuarios: any[];
  usuariosFiltrados: any[];
  tablaActiva: string;
  showRegistrar: boolean;
  showMiHistoriaClinica: boolean;
  showTablaTurnos: boolean;
  constructor(
    private userService: UsuarioService,
    private authService: AuthService,
    private papa: Papa
  ) {
    this.showMiHistoriaClinica = false;
    this.showAltaTurno = false;
    this.showRegistrar = false;
    this.showTablaTurnos = false;
    this.mostrarSpinner = false;
    this.usuarios = [];
    this.usuariosFiltrados = [];
    this.tablaActiva = 'especialista';
    this.emailPaciente = '';
    this.nombrePaciente = '';
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
    this.showMiHistoriaClinica = false;
    this.showAltaTurno = false;
    this.showRegistrar = false;
    this.actualizarTabla();
  }
  showTablaEspecialistas() {
    this.tablaActiva = 'especialista';
    this.showMiHistoriaClinica = false;
    this.showAltaTurno = false;
    this.showRegistrar = false;
    this.actualizarTabla();
  }
  showTablaAdministradores() {
    this.tablaActiva = 'administrador';
    this.showMiHistoriaClinica = false;
    this.showAltaTurno = false;
    this.showRegistrar = false;
    this.actualizarTabla();
  }
  showCrearUsuario() {
    this.tablaActiva = '';
    this.showRegistrar = true;
  }
  onShowTurnosPaciente(email: string) {
    this.emailPaciente = email;
    this.showTablaTurnos = true;
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
    this.emailPaciente = paciente.email!;
    this.nombrePaciente = `${paciente.nombre}, ${paciente.apellido}`;
    this.showAltaTurno = true;
  }
  onShowHistoriaClinica(paciente: Paciente) {
    this.emailPaciente = paciente.email!;
    this.showMiHistoriaClinica = true;
  }
  volverAlMenuPrincipal() {
    this.emailPaciente = '';
    this.showMiHistoriaClinica = false;
    this.showTablaTurnos = false;
  }
  onProcesoDeAltaTerminado() {
    this.showAltaTurno = false;
  }
  cancelarAgregarTurno() {
    this.showAltaTurno = false;
  }
  descargarExcel() {
    const excelObject = this.mapData(this.usuarios);
    const csv = this.papa.unparse({ data: excelObject });

    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    let csvURL = null;

    csvURL = window.URL.createObjectURL(csvData);

    // For Browser
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute(
      'download',
      `usuarios-${moment().format('DD-MM-yyyy')}.xlsx`
    );
    tempLink.click();
  }

  // tslint:disable-next-line: typedef
  private mapData(data: any[]) {
    return data.map((item) => {
      return {
        email: item.email,
        nombre: item.nombre,
        apellido: item.apellido,
        edad: item.edad,
        dni: item.dni,
        tipoUsuario: item.tipoUsuario,
      };
    });
  }
}
