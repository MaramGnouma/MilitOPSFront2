import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';
import { UsersWaitingService } from 'src/app/services/users-waiting.service';
import Swal from 'sweetalert2';
import { DetailComponent } from '../detail/detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersWaiting!: User[];

  constructor(private usersWaitingService: UsersWaitingService,private router:Router,private userservice:UserService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadUsersWaiting();
  }

  openDetailUser(id: any): void {
    const modalRef = this.modalService.open(DetailComponent, { centered: true });
    modalRef.componentInstance.data = id;
    modalRef.componentInstance.windowClass = 'custom-popup'; // Ajout de la classe custom-popup
  }
  
  loadUsersWaiting(): void {
    this.usersWaitingService.getUsersWaiting().subscribe(users => {
      this.usersWaiting = users;
      this.filterUsersByRole(); // Appel initial pour appliquer le filtre par rôle

    });
  }


  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  // Méthode pour changer de page
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
 

  navigateToDetailPage(userId: string) {
    this.router.navigate(['/user-details', userId]);
  }
 
  



  
  deleteMontre(montreId: string): void {
    this.userservice.deleteUser(montreId).subscribe(() => {
      // Mettez à jour la liste des montres après la suppression
      this.loadUsersWaiting();
      // Affichez une notification ou un message de confirmation
      Swal.fire({
        title: "Deleted!",
        text: "Your User has been deleted.",
        icon: "success"
      });
    });

  }
  
  onClickTrashIcon(montreId: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMontre(montreId);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }



  acceptUser(user: User): void {
    if (user._id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to accept this mission agent. Do you want to proceed?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, accept it!",
        cancelButtonText: "Cancel"
      }).then((result) => {
        if (result.isConfirmed) {
          if (user._id) {
          this.usersWaitingService.acceptUser(user._id).subscribe(
            updatedUser => {
              // Mise à jour réussie, mettez à jour localement la liste des utilisateurs
              user.status = updatedUser.status;
              // Afficher une notification ou un message de confirmation
              Swal.fire({
                title: 'Accepted!',
                text: 'Your user has been accepted.',
                icon: 'success'
              });
              // Recharger la liste des utilisateurs en attente dans l'interface
              this.loadUsersWaiting();
            },
            error => {
              // Gérer l'erreur en cas d'échec de la mise à jour
              console.error('Erreur lors de l\'acceptation de l\'utilisateur :', error);
              // Afficher une notification ou un message d'erreur
              Swal.fire({
                title: 'Error!',
                text: 'Failed to accept user.',
                icon: 'error'
              });
            }
          );
        }
        } else {
          // L'utilisateur a annulé l'action, aucune action supplémentaire nécessaire
        }
      });
    } else {
      console.error('user._id is undefined');
      // Afficher un message d'erreur ou gérer cette situation selon vos besoins
    }
  }
  selectedRole: 'Supervisor' | 'Controller' | '' = ''; // Ajout de '' pour l'option Tous les rôles
  filteredUsers: User[] = [];

  filterUsersByRole() {
    if (this.selectedRole) {
      this.filteredUsers = this.usersWaiting.filter(user => user.role === this.selectedRole);
    } else {
      this.filteredUsers = this.usersWaiting;
    }
  }


}
