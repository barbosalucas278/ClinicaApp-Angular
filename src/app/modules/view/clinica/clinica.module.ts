import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicaRoutingModule } from './clinica-routing.module';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from './especialistas/mis-horarios/mis-horarios.component';
import { HorarioCardComponent } from './especialistas/componentes/horario-card/horario-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MisTurnosComponent } from './pacientes/mis-turnos/mis-turnos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GetDownloadURLPipeModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [MiPerfilComponent, MisHorariosComponent, HorarioCardComponent, MisTurnosComponent, PerfilComponent],
  imports: [CommonModule, FormsModule, ClinicaRoutingModule, GetDownloadURLPipeModule],
})
export class ClinicaModule {}
