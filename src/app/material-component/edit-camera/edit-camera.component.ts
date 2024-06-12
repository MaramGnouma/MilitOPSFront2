import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CameraService } from 'src/app/services/camera.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-camera',
  templateUrl: './edit-camera.component.html',
  styleUrls: ['./edit-camera.component.css']
})
export class EditCameraComponent implements OnInit {
  @Input() cameraData: any;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private cameraService: CameraService,
    private activeModal: NgbActiveModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

 
  saveChanges(cameraForm:NgForm): void {

    if (cameraForm.invalid) {
      // Message d'erreur si le formulaire est invalide
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Please fill out all required fields.'
      });
      return;
    }

    if (this.selectedImage) {
      this.cameraData.photo = this.selectedImage as string;
    }
    this.cameraService.updateCamera(this.cameraData._id, this.cameraData).subscribe(
      updatedCamera => {
        // Réassigner les données mises à jour à cameraData
        this.cameraData = updatedCamera;
        console.log('Caméra mise à jour avec succès :', updatedCamera);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The camera has been successfully modified'
        }).then(() => {
          // Refresh de la page après la mise à jour et l'affichage du message
          window.location.reload();
        });;
        // Naviguer vers la page de liste des caméras après mise à jour
        this.closeModal();
        //this.router.navigate(['/cameras']);
      },
      error => {
        console.error('Erreur lors de la mise à jour de la caméra :', error);
        // Afficher un message d'erreur si nécessaire
      }
    );
  }

  closeModal(): void {
    this.activeModal.dismiss('Cross click'); // 'Cross click' est le motif de fermeture facultatif
  }
  
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
  addDescription(): void {
    if (!this.cameraData.description) {
      this.cameraData.description = [];
    }
    this.cameraData.description.push('');
  }

  removeDescription(index: number): void {
    this.cameraData.description.splice(index, 1);
  }

}
