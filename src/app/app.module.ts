import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { app_routing } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { ComponentsComponent } from './components/components.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { SolucionComponent } from './components/pages/solucion/solucion.component';
import { RegistrarSolucionComponent } from './components/pages/registrar-solucion/registrar-solucion.component';

import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { ProtegerRutasGuard } from './servicios/proteger-rutas.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    LoginComponent,
    ComponentsComponent,
    PerfilComponent,
    SolucionComponent,
    RegistrarSolucionComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ProtegerRutasGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
