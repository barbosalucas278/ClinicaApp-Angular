import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SoloEspecialistasGuard implements CanActivate {
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

            if (claim!.claims['especialista']) {
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
