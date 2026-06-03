import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categoria-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './categoria-lista.component.html'
})
export class CategoriaListaComponent implements OnInit {
  categorias: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.http.get('http://localhost:3030/api/categorias')
      .subscribe({
        next: (data: any) => this.categorias = data,
        error: (err) => console.error(err)
      });
  }

  // --- AQUÍ ESTÁ LA FUNCIÓN QUE ANGULAR NO ENCONTRABA ---
  eliminarCategoria(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.http.delete('http://localhost:3030/api/categorias/' + id)
        .subscribe({
          next: () => {
            // Si se elimina correctamente, volvemos a pedir la lista actualizada
            this.obtenerCategorias(); 
          },
          error: (err) => console.error("Error al eliminar", err)
        });
    }
  }
}