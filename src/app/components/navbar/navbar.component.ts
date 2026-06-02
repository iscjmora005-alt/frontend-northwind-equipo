import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  // ... tus otros imports si es standalone
})
export class NavbarComponent implements OnInit {
  usuarioActual: any = null;

  ngOnInit() {
    // Al cargar el navbar, buscamos en el localStorage
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.usuarioActual = null;
    window.location.href = '/login';
  }
}