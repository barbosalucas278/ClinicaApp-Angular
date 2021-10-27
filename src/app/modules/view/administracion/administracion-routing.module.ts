import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }