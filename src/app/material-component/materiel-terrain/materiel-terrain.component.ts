import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipement } from 'src/app/Models/materielsTerrain';
import { MaterielsTerrainService } from 'src/app/services/materiels-terrain.service';
import { AddMaterielsTerrainComponent } from '../add-materiels-terrain/add-materiels-terrain.component';
import { EditMaterielTerrainComponent } from '../edit-materiel-terrain/edit-materiel-terrain.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materiel-terrain',
  templateUrl: './materiel-terrain.component.html',
  styleUrls: ['./materiel-terrain.component.css']
})
export class MaterielTerrainComponent {
  equipements: Equipement[] = [];
  searchTerm: string = ''; // Terme de recherche


  constructor(private equipementService: MaterielsTerrainService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadEquipements();
  }

  loadEquipements(): void {
    this.equipementService.getEquipements().subscribe(
      (data: Equipement[]) => {
        this.equipements = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openAddSmartwatchModal() {
    this.modalService.open(AddMaterielsTerrainComponent, { centered: true });
  }
  editsmartwatch(smartwatch: any) {
    const modalRef = this.modalService.open(EditMaterielTerrainComponent, { centered: true });
    modalRef.componentInstance.materielData = smartwatch;
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
        this.equipementService.deleteEquipement(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'The item has been deleted.', 'success');
            this.loadEquipements(); // Refresh automatically after successful deletion
          },
          (error) => {
            console.error('Error deleting firearm item:', error);
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

  clearSearch() {
    this.searchTerm = '';
  }

  // Méthode pour filtrer les équipements en fonction du terme de recherche
  filterEquipements() {
    return this.equipements.filter((equipement) =>
      equipement.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

