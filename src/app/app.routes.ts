import { Routes, RouterModule, CanActivate } from '@angular/router';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ComponentsComponent } from './components/components.component';
import { SolucionComponent } from './components/pages/solucion/solucion.component';
import { RegistrarSolucionComponent } from './components/pages/registrar-solucion/registrar-solucion.component';
import { VerificarTokenGuard } from './servicios/verificar-token.guard';
import { ProtegerRutasGuard } from './servicios/proteger-rutas.guard';


const app_routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'pages', component: ComponentsComponent, children: [
        { path: 'inicio', component: InicioComponent,
          canActivate: [ProtegerRutasGuard,VerificarTokenGuard]
        },
        { path: 'solucion/:id', component: SolucionComponent,
        canActivate: [ProtegerRutasGuard,VerificarTokenGuard]
        },
        { path: 'registrar-solucion', component: RegistrarSolucionComponent,
        canActivate: [ProtegerRutasGuard,VerificarTokenGuard]
        },


    ]},
    { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

export const app_routing = RouterModule.forRoot(app_routes, {useHash: true});
