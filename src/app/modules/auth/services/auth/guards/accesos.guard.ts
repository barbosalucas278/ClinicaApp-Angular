import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { UsuarioService } from '../usuarios/usuarios.service';
@Injectable({
  providedIn: 'root',
})
export class AccesosGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    let respuestaPromesa: Promise<boolean> = new Promise<boolean>(
      (resolve, reject) => {
        setTimeout(async () => {
          let respuesta: boolean = false;
          const user = this.authService.currentUser;          
          if (user == null) {
            this.authService.logout();
            this.router.navigate(['auth']);
          } else {
            const claim = await user!.getIdTokenResult();
            if(!claim!.claims['email_verified']) throw new Error("El email no esta verificado");
            
            if (claim!.claims['paciente']) {
              respuesta = true;
            } else if (claim!.claims['especialista']) {
              respuesta = true;
            } else if (claim!.claims['administrador']) {
              respuesta = true;
            } else {
              setTimeout(() => {
                this.authService.logout();
                this.router.navigate(['auth']);
              }, 1000);
            }
          }
          resolve(respuesta);
        }, 1000);
      }
    );
    const salida: boolean = await respuestaPromesa;

    return salida;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
