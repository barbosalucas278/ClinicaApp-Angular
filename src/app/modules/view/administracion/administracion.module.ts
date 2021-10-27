import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';


@NgModule({
  declarations: [
    UsuariosAdminComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
