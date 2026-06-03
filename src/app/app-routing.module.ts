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

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'categorias', component: CategoriaListaComponent },
  { path: 'categorias/new', component: CategoriaFormComponent },
  { path: 'categorias/edit/:id', component: CategoriaFormComponent },
  { path: 'usuarios', component: UsuarioListaComponent },
  { path: 'pedidos', component: PedidoListaComponent },
  { path: 'pedidos/new', component: PedidoFormComponent },
  { path: 'detalles', component: DetallePedidoListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }