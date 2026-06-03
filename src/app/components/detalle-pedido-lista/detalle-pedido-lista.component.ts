import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-pedido-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './detalle-pedido-lista.component.html'
})
export class DetallePedidoListaComponent implements OnInit {
  detalles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerDetalles();
  }

  obtenerDetalles() {
    this.http.get('http://localhost:3030/api/detalles')
      .subscribe({
        next: (data: any) => this.detalles = data,
        error: (err) => console.error(err)
      });
  }
}