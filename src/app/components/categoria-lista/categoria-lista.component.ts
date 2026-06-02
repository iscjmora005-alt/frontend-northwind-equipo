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
  // Aquí guardaremos las categorías que lleguen de Python
  categorias: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    // Apuntamos a la ruta GET de categorías
    this.http.get('http://localhost:3030/api/categorias')
      .subscribe({
        next: (data: any) => {
          this.categorias = data;
        },
        error: (err) => {
          console.error("Error al obtener categorías:", err);
        }
      });
  }
}