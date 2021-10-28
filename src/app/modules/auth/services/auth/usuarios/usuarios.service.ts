import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Especialista } from 'src/app/modules/clases/especialista';
import { Usuario } from 'src/app/modules/clases/usuario';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuariosRef: AngularFirestoreCollection;
  constructor(private db: AngularFirestore) {
    this.usuariosRef = this.db.collection('usuarios');
  }
  obtenerCurrentUsuario(emailCurrentUser: string) {
    const currentUsuario = this.db.collection('usuarios', (ref) =>
      ref.where('email', '==', `${emailCurrentUser}`)
    );
    return currentUsuario.valueChanges() as Observable<Usuario[]>;
  }
  crearUsuarios(usuario: Usuario) {
    return this.usuariosRef.doc(usuario.email).set({...usuario})
  }
  obtenerUsuarios() {
    return this.usuariosRef.valueChanges() as Observable<Usuario[]>;
  }
  modificarEstadoEspecialista(email: string, accion: boolean) {
    const currentUsuario = this.db.doc(`usuarios/${email}`);
    return currentUsuario.update({ aprobado: accion });
  }
}
