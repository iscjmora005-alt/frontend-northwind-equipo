import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './tienda.component.html'
})
export class TiendaComponent implements OnInit {
  productosDisponibles: any[] = [];
  carrito: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Cargamos los productos al entrar a la tienda
    this.http.get('http://localhost:3030/api/products').subscribe((res: any) => {
      this.productosDisponibles = res;
    });
  }

  agregarAlCarrito(producto: any) {
    // Revisamos si ya está en el carrito para solo sumarle 1 a la cantidad
    const itemExistente = this.carrito.find(item => item.id === producto.id);
    if (itemExistente) {
      if (itemExistente.cantidad < producto.stock) {
        itemExistente.cantidad++;
      } else {
        alert('No hay más stock disponible de este producto');
      }
    } else {
      // Si no estaba, lo agregamos con cantidad 1
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  eliminarDelCarrito(productoId: number) {
    // Buscamos en qué posición del carrito está el producto
    const index = this.carrito.findIndex(item => item.id === productoId);
    
    if (index !== -1) {
      // Si hay más de 1, simplemente restamos la cantidad
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad--;
      } else {
        // Si solo queda 1, lo borramos por completo de la lista
        this.carrito.splice(index, 1);
      }
    }
  }

  calcularTotal() {
    // Cambiamos item.precio por item.price
    return this.carrito.reduce((acc, item) => acc + (item.price * item.cantidad), 0);
  }
  

  realizarCompra() {
    if (this.carrito.length === 0) return;

    // Obtenemos el usuario de la sesión actual
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    const payload = {
      usuario_id: usuarioLogueado.id || 1, // Si por algo falla, usamos el usuario 1 de respaldo
      carrito: this.carrito
    };

    this.http.post('http://localhost:3030/api/checkout', payload).subscribe({
      next: (res: any) => {
        alert('¡Compra exitosa! Tu número de pedido es: #' + res.pedido_id);
        this.carrito = []; // Vaciamos el carrito
        this.router.navigate(['/mis-pedidos']); // Lo mandamos a ver su ticket
      },
      error: (err) => alert('Hubo un error en la compra')
    });
  }
}