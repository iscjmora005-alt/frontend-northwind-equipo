import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './categoria-form.component.html'
})
export class CategoriaFormComponent implements OnInit {
  categoria: any = {
    nombre: '',
    descripcion: ''
  };
  editando = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    if (params['id']) {
      this.editando = true;
      this.http.get('http://localhost:3030/api/categorias/' + params['id'])
        .subscribe({
          next: (res: any) => {
            this.categoria = res;
          },
          error: (err) => console.error(err)
        });
    }
  }

  guardarCategoria() {
    if (this.editando) {
      this.http.put('http://localhost:3030/api/categorias/' + this.categoria.id, this.categoria)
        .subscribe({
          next: () => this.router.navigate(['/categorias']),
          error: (err) => console.error(err)
        });
    } else {
      this.http.post('http://localhost:3030/api/categorias', this.categoria)
        .subscribe({
          next: () => this.router.navigate(['/categorias']),
          error: (err) => console.error(err)
        });
    }
  }
}