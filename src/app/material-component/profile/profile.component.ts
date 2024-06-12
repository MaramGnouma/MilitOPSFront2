import { Component } from '@angular/core';
import { Admin } from 'src/app/Models/admin';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  admin: Admin = {} as Admin; // Initialisation d'un objet Admin vide
  firstname: string = '';
  lastname: string = '';

  city: string = '';
  country: string = '';
  codepostal: string = '';
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAdminData(); // Appeler une méthode pour récupérer les données de l'admin au chargement du composant
  }

  getAdminData() {
    this.adminService.getAdmin().subscribe(
      (data) => {
        this.admin = data; // Assigner les données de l'admin récupérées à la propriété admin du composant
        // Séparer le nom complet en prénom et nom de famille
        const fullNameParts = this.admin.name.split(' ');
        this.firstname = fullNameParts[0];
        this.lastname = fullNameParts.slice(1).join(' ');
const fullAdresseParts = this.admin.adresse.split(',');
        this.city = fullAdresseParts[fullAdresseParts.length - 3];
        this.country = fullAdresseParts[fullAdresseParts.length - 2];
        this.codepostal = fullAdresseParts[fullAdresseParts.length - 1];
      },
      (error) => {
        console.log('Error fetching admin data:', error);
      }
    );
  }
  updateAdmin() {
    this.admin.name = `${this.firstname} ${this.lastname}`;
    this.admin.adresse = `${this.city},${this.country},${this.codepostal}`;

    this.adminService.updateAdmin(this.admin).subscribe(
      (data) => {
        console.log('Admin updated successfully:', data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The administrator has been successfully updated.',
        }).then(() => {
          // Refresh the page
          location.reload();
        });
        
        // Ajoutez ici une logique pour gérer la mise à jour réussie de l'admin
      },
      (error) => {
        console.log('Error updating admin:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the administrator.',
        });
      }
    );
  }
  
}
