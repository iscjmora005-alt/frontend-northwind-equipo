import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  // ... (deja los imports que ya tengas aquí)
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  // Inyectamos el Router para poder redireccionar al login
  constructor(private router: Router) {}

  // 1. Aquí definimos usuarioActual para quitar las líneas rojas de los *ngIf
  get usuarioActual() {
    // Leemos la sesión del navegador. (Asegúrate de que 'usuario' sea la palabra que usas al hacer el Login)
    const usuarioGuardado = localStorage.getItem('usuario'); 
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  }

  // 2. Aquí definimos la función para quitar la línea roja del (click)
  cerrarSesion() {
    localStorage.removeItem('usuario'); // Borra los datos
    this.router.navigate(['/login']);   // Te patea a la pantalla de inicio
  }
}