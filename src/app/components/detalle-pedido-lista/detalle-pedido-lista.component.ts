import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router'; // 👈 Importamos ActivatedRoute

@Component({
  selector: 'app-detalle-pedido-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './detalle-pedido-lista.component.html'
})
export class DetallePedidoListaComponent implements OnInit {
  detalles: any[] = [];
  pedidoId: any;
  totalPedido: number = 0;

  // 👈 Inyectamos ActivatedRoute para poder leer la URL
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // 1. Atrapamos el ID del ticket que viene en la URL (ejemplo: /detalles/7)
    this.pedidoId = this.route.snapshot.paramMap.get('id');

    // 2. Si hay un ID, vamos a buscar solo esos detalles
    if (this.pedidoId) {
      this.obtenerDetallesPorId(this.pedidoId);
    }
  }

  obtenerDetallesPorId(id: string) {
    this.http.get(`http://localhost:3030/api/pedidos/${id}/detalles`)
      .subscribe({
        next: (data: any) => {
          this.detalles = data;
          
          // Calculamos el total sumando la columna subtotal
          this.totalPedido = this.detalles.reduce((suma, item) => suma + parseFloat(item.subtotal), 0);
        },
        error: (err) => console.error(err)
      });
  }
}