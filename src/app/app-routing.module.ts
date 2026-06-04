import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CategoriaListaComponent } from './components/categoria-lista/categoria-lista.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { UsuarioListaComponent } from './components/usuario-lista/usuario-lista.component';
import { PedidoListaComponent } from './components/pedido-lista/pedido-lista.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { DetallePedidoListaComponent } from './components/detalle-pedido-lista/detalle-pedido-lista.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { authGuard } from './auth.guard';
import { TiendaComponent } from './components/tienda/tienda.component';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos.component';

const routes: Routes = [
  // --- 1. RUTAS PÚBLICAS (No llevan candado) ---
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // --- 2. RUTAS PRIVADAS (Todas llevan el canActivate) ---
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'products/new', component: ProductFormComponent, canActivate: [authGuard] },
  { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [authGuard] },
  
  { path: 'categorias', component: CategoriaListaComponent, canActivate: [authGuard] },
  { path: 'categorias/new', component: CategoriaFormComponent, canActivate: [authGuard] },
  { path: 'categorias/edit/:id', component: CategoriaFormComponent, canActivate: [authGuard] },
  
  { path: 'usuarios', component: UsuarioListaComponent, canActivate: [authGuard] },
  { path: 'usuarios/edit/:id', component: UsuarioFormComponent, canActivate: [authGuard] },
  
  { path: 'pedidos', component: PedidoListaComponent, canActivate: [authGuard] },
  { path: 'pedidos/new', component: PedidoFormComponent, canActivate: [authGuard] },
  
  { path: 'detalles', component: DetallePedidoListaComponent, canActivate: [authGuard] },

  // --- 3. REDIRECCIÓN POR DEFECTO ---
  // Si alguien entra a la raíz (localhost:4200 sin nada), lo mandamos al login directo.
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'tienda', component: TiendaComponent },
  { path: 'mis-pedidos', component: MisPedidosComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }