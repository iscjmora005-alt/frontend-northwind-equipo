import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NorthwindAngular';
  // Aquí guardaremos los datos de María si es que inició sesión
  usuarioActual: any = null;

  ngOnInit() {
    // Al cargar la página, buscamos en el localStorage
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (usuarioGuardado) {
      // Si existe, lo convertimos de vuelta a un objeto y lo guardamos en la variable
      this.usuarioActual = JSON.parse(usuarioGuardado);
    }
  }

  cerrarSesion() {
    // Borramos la memoria
    localStorage.removeItem('usuario');
    // Limpiamos la variable
    this.usuarioActual = null;
    // Mandamos al usuario de regreso al login
    window.location.href = '/login';
  }
}