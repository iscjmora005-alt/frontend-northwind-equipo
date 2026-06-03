import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './pedido-form.component.html'
})
export class PedidoFormComponent implements OnInit {
  // Los datos que le mandaremos a Python
  pedido: any = {
    usuario_id: '',
    total: null
  };
  
  // Aquí guardaremos los usuarios para el menú desplegable
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.get('http://localhost:3030/api/usuarios')
      .subscribe({
        next: (data: any) => this.usuarios = data,
        error: (err) => console.error(err)
      });
  }

  guardarPedido() {
    this.http.post('http://localhost:3030/api/pedidos', this.pedido)
      .subscribe({
        next: () => {
          // Si todo sale bien, regresamos a la tabla para ver el nuevo pedido
          this.router.navigate(['/pedidos']);
        },
        error: (err) => console.error("Error al guardar el pedido", err)
      });
  }
}