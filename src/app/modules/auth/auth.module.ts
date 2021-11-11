import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesGenericosModule } from '../componentes-genericos/componentes-genericos.module';
import { GetDownloadURLPipeModule } from '@angular/fire/compat/storage';
import {
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
  RECAPTCHA_SETTINGS,
} from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent],
  imports: [
    RecaptchaModule,
    RecaptchaFormsModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentesGenericosModule,
    GetDownloadURLPipeModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.keyRecaptcha,
      } as RecaptchaSettings,
    },
  ],
})
export class AuthModule {}
