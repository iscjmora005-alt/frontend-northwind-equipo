import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pedido-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './pedido-lista.component.html'
})
export class PedidoListaComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.http.get('http://localhost:3030/api/pedidos')
      .subscribe({
        next: (data: any) => {
          this.pedidos = data;
        },
        error: (err) => console.error("Error al cargar pedidos:", err)
      });
  }
}