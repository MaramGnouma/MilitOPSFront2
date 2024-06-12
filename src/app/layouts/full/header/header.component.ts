import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Authe2Service } from 'src/app/services/authe2.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(private router: Router,private http:HttpClient,private authService:Authe2Service) {} // Injectez Router dans le constructeur

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are now logged out.",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(["/loginAdmin"]);
      },
      error: (error) => {
        console.error("Logout failed:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred during logout.",
          footer: 'Please try again later.'
        });
      }
    });
  }
  
  
  navigateToProfile(): void { // Renommez la méthode pour éviter toute confusion
    this.router.navigate(['/profile']);
  }
}
