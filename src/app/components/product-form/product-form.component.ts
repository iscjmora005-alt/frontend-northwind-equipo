import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '',price: 0, stock: 0 ,  imageUrl: ''};
  isEditMode = false;
  productId?: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.productService.getProduct(this.productId).subscribe(data => this.product = data);
      }
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