import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { Especialidad } from 'src/app/modules/clases/especialidad';
import { Especialista } from 'src/app/modules/clases/especialista';
import { LogAcceso } from 'src/app/modules/clases/log-acceso';
import { Paciente } from 'src/app/modules/clases/paciente';
import { Usuario } from 'src/app/modules/clases/usuario';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuariosRef: AngularFirestoreCollection;
  private logRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.usuariosRef = this.db.collection('usuarios');
    this.logRef = this.db.collection('logAccesos');
  }
  obtenerCurrentUsuario(emailCurrentUser: string) {
    const currentUsuario = this.db.collection('usuarios', (ref) =>
      ref.where('email', '==', `${emailCurrentUser}`)
    );
    return currentUsuario.valueChanges() as Observable<Usuario[]>;
  }
  obtenerEspecialistas() {
    const currentUsuario = this.db.collection('usuarios', (ref) =>
      ref
        .where('tipoUsuario', '==', `especialista`)
        .where('aprobado', '==', true)
    );
    return currentUsuario.valueChanges() as Observable<Especialista[]>;
  }
  obtenerPacientes() {
    const currentUsuario = this.db.collection('usuarios', (ref) =>
      ref.where('tipoUsuario', '==', `paciente`)
    );
    return currentUsuario.valueChanges() as Observable<Paciente[]>;
  }
  obtenerPaciente(email_paciente: string) {
    const currentUsuario = this.db.collection('usuarios', (ref) =>
      ref
        .where('tipoUsuario', '==', `paciente`)
        .where('email', '==', `${email_paciente}`)
    );
    return currentUsuario.valueChanges() as Observable<Paciente[]>;
  }
  crearUsuarios(usuario: Usuario) {
    return this.usuariosRef.doc(usuario.email).set({ ...usuario });
  }
  obtenerUsuarios() {
    return this.usuariosRef.valueChanges() as Observable<Usuario[]>;
  }
  modificarEstadoEspecialista(email: string, accion: boolean) {
    const currentUsuario = this.db.doc(`usuarios/${email}`);
    return currentUsuario.update({ aprobado: accion });
  }
  actualizarDisponibilidadHorariaEspecialista(
    email: string,
    especialidad: Especialidad
  ) {
    let especialidadesDB: Especialidad[] = [];
    const currentUsuario = this.db.doc<Especialista>(`usuarios/${email}`);
    currentUsuario.valueChanges().subscribe((user) => {
      especialidadesDB = [];
      especialidadesDB.push(...user?.especialidad!);
    });
    setTimeout(() => {
      for (const especialidadDB of especialidadesDB) {
        if (especialidadDB.detalle == especialidad.detalle) {
          especialidadDB.horarioaDesde = especialidad.horarioaDesde;
          especialidadDB.horariosHasta = especialidad.horariosHasta;
        }
      }
      return currentUsuario.update({ especialidad: especialidadesDB });
    }, 500);
  }
  guardarLogin(email_usuario: string) {
    const dia = moment().format('DD-MM-yyyy');
    const horario = moment().format('HH:mm');
    let userLog: Usuario;
    this.obtenerCurrentUsuario(email_usuario).subscribe((user) => {
      userLog = user[0];
    });
    setTimeout(() => {
      return this.logRef.add({ usuario: userLog, dia: dia, horario: horario });
    }, 2000);
  }
  obtenerIngresos() {
    return this.logRef.valueChanges() as Observable<LogAcceso[]>;
  }
}
