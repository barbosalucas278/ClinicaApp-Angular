import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/view/home/home.module';
import { LayoutModule } from './modules/view/layout/layout.module';
import { AuthModule } from './modules/auth/auth.module';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { ClinicaModule } from './modules/view/clinica/clinica.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FirebaseModule,
    AppRoutingModule,
    LayoutModule,
    HomeModule,
    AuthModule,
    ClinicaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
