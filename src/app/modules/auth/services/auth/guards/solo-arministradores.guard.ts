import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SoloArministradoresGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    let respuestaPromesa: Promise<boolean> = new Promise<boolean>(
      (resolve, reject) => {
        setTimeout(async () => {
          let respuesta: boolean = false;
          const user = this.authService.currentUser;
          if (user == null) { //TODO: ES REDUNDANTE LO HACE EL PRIMER GUARD
            this.authService.logout();
            this.router.navigate(['auth']);
          } else {
            const claim = await user!.getIdTokenResult();

            if (claim!.claims['administrador']) {
              respuesta = true;
            } else {
              setTimeout(() => {
                this.router.navigate(['home']);
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
}
