import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesoMisTurnosGuard } from '../../auth/services/auth/guards/acceso-mis-turnos.guard';
import { SoloEspecialistasGuard } from '../../auth/services/auth/guards/solo-especialistas.guard';
import { SoloPacientesGuard } from '../../auth/services/auth/guards/solo-pacientes.guard';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
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
        path: 'misturnos',
        component: MisTurnosComponent,
        canActivate: [AccesoMisTurnosGuard],
      },
      {
        path: '',
        redirectTo: 'miperfil',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicaRoutingModule {}
