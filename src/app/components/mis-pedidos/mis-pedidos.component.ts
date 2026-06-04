import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './mis-pedidos.component.html'
})
export class MisPedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuarioGuardado && usuarioGuardado.id) {
      this.http.get(`http://localhost:3030/api/mis-pedidos/${usuarioGuardado.id}`)
        .subscribe((data: any) => {
          this.pedidos = data;
        });
    }
  }
}