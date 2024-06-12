import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu, MenuItems } from '../../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Emitters } from './emitters';
import { Observable } from 'rxjs';
import { Authe2Service } from 'src/app/services/authe2.service';
import Swal from 'sweetalert2';
declare function  initializeDashboard() :void;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  message = '';

  private _mobileQueryListener: () => void;
  isLoggedInSubject: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private http: HttpClient,
    private authService : Authe2Service,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 900px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  toggleMenu(menuitem: Menu): void {
    this.menuItems.toggleMenu(menuitem);
  }
  
  userName: string = '';
/*
  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user) => {
        this.userName = user.fname; // Supposons que le nom de l'utilisateur se trouve dans la propriété 'name'
      },
      (error) => {
        console.error("Error fetching user data:", error);
      }
    );
  }

*/
  ngOnInit(): void {

    initializeDashboard();
 /*   this.authService.getUser().subscribe(
      (user) => {
        this.userName = user.email; // Supposons que le nom de l'utilisateur se trouve dans la propriété 'name'
      },
      (error) => {
        console.error("Error fetching user data:", error);
      }
    );*/

  }


/*
  logout(): void {
    // Effectuez ici toutes les opérations de déconnexion nécessaires (par exemple, vider le localStorage, supprimer les cookies, etc.)
    // Puis naviguez vers la page de connexion
    this.router.navigate(['/login']);
  }*/



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
        this.router.navigate(["/login"]);
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
