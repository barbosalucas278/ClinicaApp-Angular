import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { ComponentesGenericosModule } from '../../componentes-genericos/componentes-genericos.module';
import { AuthModule } from '../../auth/auth.module';
import { PipesModule } from '../../pipes/pipes.module';
import { TurnosAdminComponent } from './turnos-admin/turnos-admin.component';
import { TablaTurnosComponent } from '../clinica/especialistas/componentes/tabla-turnos/tabla-turnos.component';
import { ClinicaModule } from '../clinica/clinica.module';
import { DirectivasModule } from '../../directivas/directivas.module';
import { InformesComponent } from './informes/informes.component';
import { TablaIngresosComponent } from './tabla-ingresos/tabla-ingresos.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuariosAdminComponent, TurnosAdminComponent, InformesComponent, TablaIngresosComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdministracionRoutingModule,
    ComponentesGenericosModule,
    AuthModule,
    PipesModule,
    ClinicaModule,
    DirectivasModule,
  ],
})
export class AdministracionModule {}
