import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // Aquí guardamos lo que el usuario escribe en las cajas de texto
  credenciales = { correo: '', password: '' };
  mensajeError = '';

  constructor(private http: HttpClient, private router: Router) {}

  iniciarSesion() {
    // Limpiamos errores previos
    this.mensajeError = ''; 

    // Disparamos el POST a tu servidor en FastAPI
    this.http.post('http://localhost:3030/api/login', this.credenciales)
      .subscribe({
        next: (respuesta: any) => {
          if (respuesta.error) {
            this.mensajeError = respuesta.error;
          } else {
            // ---> LO NUEVO: Guardamos el usuario en la memoria del navegador <---
            // Lo convertimos a texto (JSON.stringify) porque localStorage solo acepta texto
            localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
            
            alert(respuesta.mensaje); 
            
            // Redirigimos al usuario a la tabla de productos
            // Usamos window.location.href para forzar a la página a recargar la barra de navegación
            window.location.href = '/products'; 
          }
        },
        error: (err) => {
          console.error(err);
          this.mensajeError = 'No se pudo conectar con el servidor.';
        }
      });
  }
}