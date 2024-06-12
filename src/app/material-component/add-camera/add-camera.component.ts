import { Component } from '@angular/core';
import { Camera } from '../camera';
import { CameraService } from 'src/app/services/camera.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-camera',
  templateUrl: './add-camera.component.html',
  styleUrls: ['./add-camera.component.css']
})
export class AddCameraComponent {

  camera: Camera = {
    name: '',
    photo: '',
    quantite: 0,
    disponible: true,
    description: [''],
    modele: '',
    technologie: '', // Ajout de la propriété manquante
    capteur: '',     // Ajout de la propriété manquante
    resolution: '',  // Ajout de la propriété manquante
    dimensions: ''   // Ajout de la propriété manquante
  };
  

  constructor(private cameraService: CameraService, public activeModal: NgbActiveModal, private router: Router) { }

  onSubmit() {
    if (!this.isValidForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all the fields!',
      });
      return;
    }

    this.camera.photo = this.selectedImage as string;

    this.cameraService.createCamera(this.camera).subscribe(
      (response) => {
        console.log('Caméra ajoutée avec succès:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The new camera has been successfully added.',
        }).then(() => {
          this.activeModal.close('success');
          window.location.reload();
        });
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la caméra:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the camera!',
        });
      }
    );
  }

  isValidForm(): boolean {
    return this.camera.name.trim() !== '' &&
    this.selectedImage !== null &&
    this.camera.quantite > 0 &&
    this.camera.modele.trim() !== '' &&
    this.camera.technologie.trim() !== '' &&
    this.camera.capteur.trim() !== '' &&
    this.camera.resolution.trim() !== '' &&
    this.camera.dimensions.trim() !== '' &&
    this.camera.description.every(desc => desc.trim() !== '');
  }

  addDescription() {
    this.camera.description.push('');
  }

  private resetForm() {
    this.camera = {
      name: '',
      photo: '',
      quantite: 0,
      disponible: true,
      description: [''],
      modele: '',
      technologie: '',
      capteur: '',
      resolution: '',
      dimensions: ''
    };
    this.selectedImage = null;
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  annuler() {
    this.router.navigate(['/camera']);
  }

  selectedImage: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
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

  clearSelectedFile(): void {
    this.selectedImage = null;
  }

  getSelectedFileUrl(): string | null {
    return this.selectedImage as string;
  }

}
