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
  currentUser?: any;
  constructor(
    private afAuth: AngularFireAuth,
    private usuariosService: UsuarioService,
    private fns: AngularFireFunctions,
    private storageService: StorageService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user && user.emailVerified) {
        this.setCurrentUser(user);
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
    return this.afAuth.signOut();
  }
  signin(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (user) => {

        if (user == null) {
          throw new Error('El email o la contraseña son incorrectas');
        } else if (!user.user?.emailVerified) {
          throw new Error(
            'El email no está verificado, por favor revise su correo.'
          );
        }
        //Excluvio de proyecto clinica
        const token = await user.user.getIdTokenResult();
        
        if (token.claims['especialista'] && !token.claims['aprobado']) {
          throw new Error(
            'Su cuenta debe ser aprobada por un Administrador para poder ingresar'
          );
        }
        //
        return user;
      })
      .catch((error) => {
        throw error;
      });
  }
  async register(usuario: Usuario, files: File[]) {
    let test:any; 
    await this.afAuth.credential.subscribe(x => {
        test = x;
    });
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
        const dni = newUsuario.dni!;
        for (const file in files) {
          if (Object.prototype.hasOwnProperty.call(files, file)) {
            const element = files[file];
            this.storageService.uploadFilePublic(element, dni).then((task) => {
              newUsuario.urlImgs?.push(task.metadata.fullPath);
            });
          }
        }
        //Guardado de los datos del usuario en el firestore database
        setTimeout(() => {
          this.usuariosService.crearUsuarios(newUsuario);
          this.afAuth.signOut()
          this.afAuth.signInWithCredential(test)
        }, 5000);
      });
  }
  getUserAuthState(): Observable<
    import('firebase/compat').default.User | null
  > {
    return this.afAuth.authState;
  }
  /**
   * Funcion para manejar el estado de habilitado de un especialista
   * @param email Email dle especialista
   * @param accion true: habilita | false: inhabilita
   * @returns
   */
  funcionHabilitarEspecialista(email: string, accion: boolean) {
    if (email) {
      const fnAdministrador = this.fns.httpsCallable('aprobarEspecialista');
      fnAdministrador({ email: email, accion: accion })
        .toPromise()
        .then((res) => {
          console.log(res);
          
          this.usuariosService.modificarEstadoEspecialista(email, accion);
        })
        .catch((error) => {
          throw error;
        });
    } else {
      throw new Error('El email no tiene que ser nulo');
    }
  }
}
