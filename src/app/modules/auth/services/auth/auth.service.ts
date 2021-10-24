import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs/internal/Observable';
import { Usuario } from 'src/app/modules/clases/usuario';
import { StorageService } from '../storage/storage.service';
import { UsuarioService } from './usuarios/usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  statusUserChangedEvent: EventEmitter<boolean> = new EventEmitter();
  currentUserChangedEvent: EventEmitter<boolean> = new EventEmitter();

  hasLogged: boolean = false;
  mostrarHeader: boolean;
  currentUser?: any;
  constructor(
    private afAuth: AngularFireAuth,
    private usuariosService: UsuarioService,
    private fns: AngularFireFunctions,
    private storageService: StorageService
  ) {
    this.mostrarHeader = false;
    this.afAuth.authState.subscribe((user) => {
      this.mostrarHeader = true;
      this.setCurrentUser(user);
      if (user && user.emailVerified) {
        this.setHasLogged(true);
      } else {
        this.setHasLogged(false);
      }
    });
  }
  setCurrentUser(user: any) {
    if (user != null) {
      this.currentUser = user;
      this.currentUserChangedEvent.emit(user);
    }
  }
  setHasLogged(condition: boolean) {
    this.hasLogged = condition;
    this.statusUserChangedEvent.emit(condition);
  }
  logout() {
    this.mostrarHeader = false;
    return this.afAuth.signOut();
  }
  signin(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user == null) {
          throw new Error('El email o la contraseña son incorrectas');
        } else if (!user.user?.emailVerified) {
          throw new Error('El email no está verificado, por favor revise su correo.');          
        }
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }
  async register(usuario: Usuario, files: File[]) {
    return this.afAuth
      .createUserWithEmailAndPassword(usuario.email!, usuario.password!)
      .then((user) => {
        //Asignacion de claims
        switch (usuario.tipoUsuario) {
          case 'paciente':
            const fnPaciente = this.fns.httpsCallable('addPacienteRole');
            fnPaciente({ email: user.user?.email })
              .toPromise()
              .then((result) => console.log(result));
            break;
          case 'especialista':
            const fnEspecialista = this.fns.httpsCallable(
              'addEspecialistaRole'
            );
            fnEspecialista({ email: user.user?.email })
              .toPromise()
              .then((result) => console.log(result));
            break;
          case 'administrador':
            const fnAdministrador = this.fns.httpsCallable('addAdminRole');
            fnAdministrador({ email: user.user?.email })
              .toPromise()
              .then((result) => console.log(result));
            break;
          default:
            break;
        }
        //Envio del email de verificacion
        user.user?.sendEmailVerification();
        const newUsuario: Usuario = { ...usuario };
        //Guardado de las imagenes del usuario en el storage
        for (const file in files) {
          if (Object.prototype.hasOwnProperty.call(files, file)) {
            const element = files[file];
            console.log(element);
            console.log(files);

            this.storageService.uploadFilePublic(element).then((task) => {
              newUsuario.urlImgs?.push(task.metadata.fullPath);
            });
          }
        }
        //Guardado de los datos del usuario en el firestore database
        this.usuariosService.crearUsuarios(newUsuario);
      });
  }
  getUserAuthState(): Observable<
    import('firebase/compat').default.User | null
  > {
    return this.afAuth.authState;
  }
}
