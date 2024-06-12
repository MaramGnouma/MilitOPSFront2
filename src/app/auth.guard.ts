import { Injectable } from '@angular/core';
import { Authe2Service } from './services/authe2.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: Authe2Service, private router: Router) {}

  canActivate(): boolean {
    console.log('AuthGuard canActivate()'); // Ajoutez cette ligne pour le débogage

    if (this.authService.isLoggedIn()) {
   
      return true; // Autoriser l'accès à la route si l'utilisateur est connecté
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return false; // Interdire l'accès à la route
    }
  }
}
