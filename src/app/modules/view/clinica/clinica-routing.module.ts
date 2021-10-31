import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoloEspecialistasGuard } from '../../auth/services/auth/guards/solo-especialistas.guard';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'miperfil',
        component: MiPerfilComponent,
      },
      {
        path: '',
        redirectTo: 'miperfil',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicaRoutingModule { }
