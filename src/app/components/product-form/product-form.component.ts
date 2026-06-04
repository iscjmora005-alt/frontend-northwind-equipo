import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- 1. Importamos HttpClient
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule], // <-- 2. Añadimos HttpClientModule aquí
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  // 3. Añadimos categoria_id inicializado en vacío
  product: Product = { name: '', price: 0, stock: 0, imageUrl: '', categoria_id: '' }; 
  isEditMode = false;
  productId?: number;
  
  // 4. Variable para guardar la lista de categorías
  categorias: any[] = []; 

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient // <-- 5. Inyectamos http en el constructor
  ) {}

  ngOnInit(): void {
    // 6. Al abrir la pantalla, vamos por las categorías
    this.obtenerCategorias();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.productService.getProduct(this.productId).subscribe(data => this.product = data);
      }
    });
  }

  // 7. Función para consultar el backend
  obtenerCategorias() {
    this.http.get('http://localhost:3030/api/categorias')
      .subscribe({
        next: (data: any) => this.categorias = data,
        error: (err) => console.error("Error al cargar categorías", err)
      });
  }

  saveProduct(): void {
    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, this.product)
        .subscribe(() => this.router.navigate(['/products']));
    } else {
      this.productService.createProduct(this.product)
        .subscribe(() => this.router.navigate(['/products']));
    }
  }
}