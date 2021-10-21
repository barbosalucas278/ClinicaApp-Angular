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
    const user = this.authService.currentUser;
    const claim = await user!.getIdTokenResult();
    let token: firebase.default.auth.IdTokenResult;
    let respuestaPromesa = false;
    token = claim;
    if (token!.claims['paciente'] && token!.claims['email_verified']) {
      respuestaPromesa = true;
    } else if (
      token!.claims['especialista'] &&
      token!.claims['email_verified']
    ) {
      respuestaPromesa = true;
    } else if (
      token!.claims['administrador'] &&
      token!.claims['email_verified']
    ) {
      respuestaPromesa = true;
    }
    return respuestaPromesa;

    // let resultado = this.authService
    //   .getUserAuthState()
    //   .pipe(
    //     map(async (user) => {
    //       const claim = await user!.getIdTokenResult();
    //       let token: firebase.default.auth.IdTokenResult;
    //       let respuestaPromesa = false;
    //       token = claim;
    //       if (token!.claims['paciente'] && token!.claims['email_verified']) {
    //         respuestaPromesa = true;
    //       } else if (
    //         token!.claims['especialista'] &&
    //         token!.claims['email_verified']
    //       ) {
    //         respuestaPromesa = true;
    //       } else if (
    //         token!.claims['administrador'] &&
    //         token!.claims['email_verified']
    //       ) {
    //         respuestaPromesa = true;
    //       }
    //       return respuestaPromesa;
    //     })
    //   )
    //   .toPromise();
    // return resultado.then(async (result) => {
    //   return await result;
    // });
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
