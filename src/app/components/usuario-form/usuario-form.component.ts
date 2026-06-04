import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent implements OnInit {
  // Asegúrate de agregar rol: 'CLIENTE' a los valores iniciales
  usuario: any = { nombre: '', correo: '', password: '', rol: 'CLIENTE' };
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Capturamos el ID de la URL
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.http.get('http://localhost:3030/api/usuarios/' + id)
        .subscribe({
          next: (res: any) => this.usuario = res,
          error: (err) => console.error("Error al cargar usuario", err)
        });
    }
  }

  actualizarUsuario() {
    this.http.put('http://localhost:3030/api/usuarios/' + this.usuario.id, this.usuario)
      .subscribe({
        next: () => {
          // Regresamos a la lista de usuarios al terminar
          this.router.navigate(['/usuarios']);
        },
        error: (err) => console.error("Error al actualizar", err)
      });
  }
}