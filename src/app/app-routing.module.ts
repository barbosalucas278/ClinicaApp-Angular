import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesosGuard } from './modules/auth/services/auth/guards/accesos.guard';
import { HomeComponent } from './modules/view/home/home/home.component';
import { ErrorPageComponent } from './modules/view/layout/error-page/error-page.component';
import { canActivate, customClaims, hasCustomClaim, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AccesosGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
