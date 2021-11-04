import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicaRoutingModule } from './clinica-routing.module';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './especialistas/mis-horarios/mis-horarios.component';
import { HorarioCardComponent } from './especialistas/componentes/horario-card/horario-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GetDownloadURLPipeModule } from '@angular/fire/compat/storage';
import { AltaTurnoComponent } from './pacientes/componentes/alta-turno/alta-turno.component';
import { ListaDeTurnosComponent } from './pacientes/componentes/lista-de-turnos/lista-de-turnos.component';
import { ComponentesGenericosModule } from '../../componentes-genericos/componentes-genericos.module';
import { PipesModule } from '../../pipes/pipes.module';
import { CardTurnoComponent } from './pacientes/componentes/card-turno/card-turno.component';
import { DirectivasModule } from '../../directivas/directivas.module';
import { TablaTurnosComponent } from './especialistas/componentes/tabla-turnos/tabla-turnos.component';

@NgModule({
  declarations: [
    MiPerfilComponent,
    MisHorariosComponent,
    HorarioCardComponent,
    MisTurnosComponent,
    PerfilComponent,
    AltaTurnoComponent,
    ListaDeTurnosComponent,
    CardTurnoComponent,
    TablaTurnosComponent,
  ],
  exports: [TablaTurnosComponent, AltaTurnoComponent, CardTurnoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClinicaRoutingModule,
    GetDownloadURLPipeModule,
    ComponentesGenericosModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivasModule,
  ],
})
export class ClinicaModule {}
