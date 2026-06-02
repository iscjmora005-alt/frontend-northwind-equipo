import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  // Estructura idéntica a lo que espera tu backend en Python
  nuevoUsuario = { nombre: '', correo: '', password: '' };
  mensajeError = '';

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    this.mensajeError = ''; 

    // Apuntamos a la ruta de usuarios que ya validaste antes
    this.http.post('http://localhost:3030/api/usuarios', this.nuevoUsuario)
      .subscribe({
        next: (respuesta: any) => {
          if (respuesta.error) {
            this.mensajeError = respuesta.error;
          } else {
            alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
            // Lo mandamos al login para que pruebe su nueva cuenta
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error(err);
          this.mensajeError = 'Error al conectar con el servidor.';
        }
      });
  }
}