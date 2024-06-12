import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Intervenant } from 'src/app/Models/intervenant';
import { IntervenantService } from 'src/app/services/intervenant.service';
import Swal from 'sweetalert2';
import { DetailIntervenantComponent } from '../detail-intervenant/detail-intervenant.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditIntervenantComponent } from '../edit-intervenant/edit-intervenant.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';

@Component({
  selector: 'app-list-intervenant',
  templateUrl: './list-intervenant.component.html',
  styleUrls: ['./list-intervenant.component.css']
})
export class ListIntervenantComponent {
  intervenants!: any[];

  dataSource!: MatTableDataSource<Intervenant>; // Déclarer le type de dataSource
  sortBy: string = ''; // Ajouter sortBy pour suivre la colonne triée
  ascending: boolean = true; 
  constructor(
    private intervenantservice:IntervenantService ,public dialog: MatDialog,private router: Router,
    private modalService: NgbModal

  ) {
  }
  /*
  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DetailIntervenantComponent, {
      data: id // Transmettez seulement l'ID
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
*/

displayedColumns: string[] = ['image', 'name', 'email', 'birth', 'actions'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort; 

toggleSort(column: string) {
  if (this.sortBy === column) {
    this.ascending = !this.ascending;
  } else {
    this.sortBy = column;
    this.ascending = true;
  }

  this.applySort();

}


applySort() {
  const direction: SortDirection = this.ascending ? 'asc' : 'desc';
  const columnName = this.sortBy;

  // Trier les données en fonction de la colonne et de la direction
  this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
    const valueA = a[columnName];
    const valueB = b[columnName];

    // Convertir les valeurs de date en objets Date
    const dateA = new Date(valueA);
    const dateB = new Date(valueB);

    if (dateA < dateB) {
      return direction === 'asc' ? -1 : 1;
    } else if (dateA > dateB) {
      return direction === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });

  // Mettre à jour le paginator après le tri
  if (this.paginator) {
    this.paginator.firstPage();
  }
}


openDialog(id: any): void {
    const modalRef = this.modalService.open(DetailIntervenantComponent, { centered: true });
    modalRef.componentInstance.data = id;
    modalRef.componentInstance.windowClass = 'custom-popup'; // Ajout de la classe custom-popup
  }
  




  ngOnInit(): void {
    this.loadintervenant();
  }
  loadintervenant(){
    this.intervenantservice.getIntervenants().subscribe(data => {
      this.intervenants = data;
      this.dataSource = new MatTableDataSource<Intervenant>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort; 
    });
  }

  editintervenant(intervenant: any) {
    const modalRef = this.modalService.open(EditIntervenantComponent, { centered: true });
    modalRef.componentInstance.smartwatchData = intervenant;
  }
  supprimer(id: string): void {
    // Use SweetAlert for confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms deletion, call your delete API
        this.intervenantservice.deleteIntervenant(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'The item has been deleted.', 'success');
            this.loadintervenant(); // Refresh automatically after successful deletion
          },
          (error) => {
            console.error('Error deleting Soldiers item:', error);
            // Handle error and display appropriate message to user
            Swal.fire('Error!', 'Failed to delete the item.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If user clicks on "No, keep it", show a message
        Swal.fire('Cancelled', 'The item was not deleted ', 'info');
      }
    });
  }

  modifier(id: string, intervenant: Intervenant): void {
    console.log('viewDetails - id', id);
    console.log('viewDetails - details', intervenant);
    this.intervenantservice.updateIntervenant(id, intervenant).subscribe(
      (intervenant) => {
        this.router.navigate(['/updatesoldats', id]);
      },
      (error) => {
        console.error(`Error loading Soldiers details for ID ${id}`, error);
      }
    );
  }

}
