import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesGenericosModule } from '../componentes-genericos/componentes-genericos.module';
import { GetDownloadURLPipeModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentesGenericosModule,
    GetDownloadURLPipeModule,
  ],
})
export class AuthModule {}
