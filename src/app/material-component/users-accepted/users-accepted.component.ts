import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { User } from 'src/app/Models/user';
import { UsersAcceptésService } from 'src/app/services/users-acceptés.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from '../detail/detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users-accepted',
  templateUrl: './users-accepted.component.html',
  styleUrls: ['./users-accepted.component.css']
})
export class UsersAcceptedComponent implements OnInit {
  usersAccepte!: User[];

  constructor(private usersAcceptéService: UsersAcceptésService,private router:Router,private modalService: NgbModal,private userservice:UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsersWaiting();
  }

  loadUsersWaiting(): void {
    this.usersAcceptéService.getUsersAccepté().subscribe(users => {
      this.usersAccepte = users;
      this.filterUsersByRole(); // Appel initial pour appliquer le filtre par rôle

    });
  }

  editsmartwatch(smartwatch: any) {
    const modalRef = this.modalService.open(EditUserComponent, { centered: true });
    modalRef.componentInstance.smartwatchData = smartwatch;
  }





  // Pagination
  currentPage = 1;
  itemsPerPage = 5;

  // Méthode pour changer de page
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  /*
  getTotalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }
*/
  openAddSmartwatchModal() {
    this.modalService.open(AddUserModalComponent, { centered: true });
  }

  openDetailUser(id: any): void {
    const modalRef = this.modalService.open(DetailComponent, { centered: true });
    modalRef.componentInstance.data = id;
    modalRef.componentInstance.windowClass = 'custom-popup'; // Ajout de la classe custom-popup
  }
  


  navigateToDetailPage(userId: string) {
    this.router.navigate(['/user-details', userId]);
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DetailComponent, {
      data: id // Transmettez seulement l'ID
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
  

  modifier(id: string, intervenant: User): void {
    console.log('viewDetails - id', id);
    console.log('viewDetails - details', intervenant);
    this.userservice.updateUser(id, intervenant).subscribe(
      (intervenant) => {
        this.router.navigate(['/updateagant', id]);
        console.log("user update:",intervenant);
      },
      (error) => {
        console.error(`Error loading Soldiers details for ID ${id}`, error);
      }
    );
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

  selectedRole: 'Supervisor' | 'Controller' | '' = ''; // Ajout de '' pour l'option Tous les rôles
  filteredUsers: User[] = [];

  filterUsersByRole() {
    if (this.selectedRole) {
      this.usersAcceptéService.getUsersAccepté().subscribe(users => {
        this.filteredUsers = users.filter(user => user.role === this.selectedRole);
      });
    } else {
      this.usersAcceptéService.getUsersAccepté().subscribe(users => {
        this.filteredUsers = users;
      });
    }
  }

  
}
