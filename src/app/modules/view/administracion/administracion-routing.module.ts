import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformesComponent } from './informes/informes.component';
import { TurnosAdminComponent } from './turnos-admin/turnos-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarios',
        component: UsuariosAdminComponent,
      },
      {
        path: 'turnos',
        component: TurnosAdminComponent,
      },
      {
        path: 'informes',
        component: InformesComponent,
      },
      {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionRoutingModule {}
