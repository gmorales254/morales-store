import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorComponent } from './components/error/error.component';
import { ControlGuardsService } from './guards/control-guards.service';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PerfilComponent } from './components/perfil/perfil.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  pathMatch: 'full'
},
{path: 'home', 
component: HomeComponent,
redirectTo: '',
canActivate:[ControlGuardsService]
},
{path: 'login', 
component: LoginComponent
},{ path: 'registro',
component: RegistroComponent
},{
  path: 'productos',
  component: ProductosComponent,
  canActivate:[ControlGuardsService]  
},{
  path: 'carrito',
  component: CarritoComponent,
  canActivate:[ControlGuardsService]
},{
  path: 'mi-perfil',
  component: PerfilComponent,
  canActivate:[ControlGuardsService]
},{
  path: 'error', 
  component: ErrorComponent,
  canActivate:[ControlGuardsService]
},{
  path: '**',
  redirectTo: 'error'
}
]

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, BrowserModule],
  exports: [RouterModule],
  providers: [ControlGuardsService]
})
export class AppRoutingModule { }
