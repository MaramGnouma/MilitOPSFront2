import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MaterielsTerrainService } from 'src/app/services/materiels-terrain.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-materiel-terrain',
  templateUrl: './edit-materiel-terrain.component.html',
  styleUrls: ['./edit-materiel-terrain.component.css']
})
export class EditMaterielTerrainComponent implements OnInit{
  @Input() materielData: any;
  constructor(private materielsService: MaterielsTerrainService,private activeModal: NgbActiveModal,private router:Router) { }

  ngOnInit(): void {
  }

  saveChanges(firearmForm:NgForm) {
    if (firearmForm.invalid) {
      // Message d'erreur si le formulaire est invalide
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please fill out all required fields.'
      });
      return;
    }

    if (this.selectedImage) {
      this.materielData.photo = this.selectedImage as string;
    }
    this.materielsService.updateEquipement(this.materielData._id, this.materielData).subscribe(updatedEquipement => {
      // Réassigner les données mises à jour à materielData
      this.materielData = updatedEquipement;
      console.log('Équipement mis à jour avec succès :', updatedEquipement);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'The firearm has been successfully modified'
      }).then(() => {
        // Refresh de la page après la mise à jour et l'affichage du message
        window.location.reload();
      });;
        
      // Naviguer vers la page de liste des équipements après mise à jour
      this.closeModal() ;
      //location.reload();
      //this.refreshPage();
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'équipement :', error);
      // Afficher un message d'erreur si nécessaire
    });
  }
  closeModal() {
    this.activeModal.dismiss('Cross click'); // 'Cross click' est le motif de fermeture facultatif
  }
  refreshPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/materiels']);
    });
  }

  selectedImage: string | ArrayBuffer | null = null;

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(files[0]);
    }
  }
  
  addarmements(): void {
    if (!this.materielData.armements) {
      this.materielData.armements = [];
    }
    this.materielData.armements.push('');
  }

  removearmements(index: number): void {
    this.materielData.armements.splice(index, 1);
  }


  adddimensions(): void {
    if (!this.materielData.dimensions) {
      this.materielData.dimensions = [];
    }
    this.materielData.dimensions.push('');
  }

  removedimensions(index: number): void {
    this.materielData.dimensions.splice(index, 1);
  }



  addaccessoires(): void {
    if (!this.materielData.accessoires) {
      this.materielData.accessoires = [];
    }
    this.materielData.accessoires.push('');
  }

  removeaccessoires(index: number): void {
    this.materielData.accessoires.splice(index, 1);
  }
}

