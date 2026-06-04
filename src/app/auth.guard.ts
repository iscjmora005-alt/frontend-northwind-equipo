import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usuarioGuardado = localStorage.getItem('usuario');

  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    
    // Si la ruta a la que quiere entrar NO es la tienda, y NO es admin, lo rebotamos.
    // Si NO es admin, y además la ruta NO es /tienda y NO es /mis-pedidos, lo rebotamos.
    if (usuario.rol !== 'ADMIN' && state.url !== '/tienda' && state.url !== '/mis-pedidos') {
      alert('Acceso denegado. Área exclusiva de administración.');
      router.navigate(['/tienda']);
      return false;
    }
    return true; // Si es admin, o si es cliente yendo a la tienda, lo dejamos pasar.
  } else {
    router.navigate(['/login']);
    return false;
  }
};