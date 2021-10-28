import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { ComponentesGenericosModule } from '../../componentes-genericos/componentes-genericos.module';
import { AuthModule } from '../../auth/auth.module';

@NgModule({
  declarations: [UsuariosAdminComponent],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ComponentesGenericosModule,
    AuthModule,
  ],
})
export class AdministracionModule {}
