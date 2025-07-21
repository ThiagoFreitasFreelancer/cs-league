import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Simulação: no real, faça chamada à API ou verifique token JWT
  isAdmin(): Observable<boolean> {
    // Exemplo: retornar true se o usuário logado for admin
    return of(true); // Troque para lógica real
  }
} 