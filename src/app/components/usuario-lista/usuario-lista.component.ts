import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './usuario-lista.component.html'
})
export class UsuarioListaComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.get('http://localhost:3030/api/usuarios')
      .subscribe({
        next: (data: any) => {
          this.usuarios = data;
        },
        error: (err) => console.error("Error al cargar usuarios:", err)
      });
  }

  // Agrega esta función dentro de tu clase UsuarioListaComponent
  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar a este usuario?')) {
      this.http.delete('http://localhost:3030/api/usuarios/' + id)
        .subscribe({
          next: () => {
            // Recargamos la lista tras borrar
            this.obtenerUsuarios(); 
          },
          error: (err) => console.error("Error al eliminar", err)
        });
    }
  }
}