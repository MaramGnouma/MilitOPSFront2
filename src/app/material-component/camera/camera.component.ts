import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditCameraComponent } from '../edit-camera/edit-camera.component';
import { Camera } from '../camera';
import { CameraService } from 'src/app/services/camera.service';
import { CameraDetailComponent } from '../camera-detail/camera-detail.component';

import { AddCameraComponent } from '../add-camera/add-camera.component';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  cameras: Camera[] = [];
  selectedCamera: Camera | undefined;
  newCamera: Camera = {
    name: '',
    photo: '', // Single string, not an array
    quantite: 0, // This is required as per the model
    disponible: false, // This is required as per the model
    description: [], // Array of strings
    modele: '',
    technologie: '', // Optional, so it's fine to leave it as an empty string initially
    capteur: '', // Optional
    resolution: '', // Optional
    dimensions: '' // Optional
  };

  constructor(private cameraService: CameraService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadCameras();
  }

  loadCameras(): void {
    this.cameraService.getAllCameras().subscribe(cameras => {
      this.cameras = cameras;
    });
  }



  addNewCamera() {
    this.modalService.open(AddCameraComponent, { centered: true });


  }

  openDetailUser(id: any): void {
    const modalRef = this.modalService.open(CameraDetailComponent, { centered: true });
    modalRef.componentInstance.data = id;
    modalRef.componentInstance.windowClass = 'custom-popup'; // Ajout de la classe custom-popup
  }

  editCamera(smartwatch: any) {
    const modalRef = this.modalService.open(EditCameraComponent, { centered: true });
    modalRef.componentInstance.cameraData = smartwatch;
  }
  
  createCamera(): void {
    this.cameraService.createCamera(this.newCamera).subscribe(() => {
      this.loadCameras();
      this.newCamera = {
        _id: '',
        name: '',
    photo: '', // Single string, not an array
    quantite: 0, // This is required as per the model
    disponible: false, // This is required as per the model
    description: [], // Array of strings
    modele: '',
    technologie: '', // Optional, so it's fine to leave it as an empty string initially
    capteur: '', // Optional
    resolution: '', // Optional
    dimensions: ''
      };
    });
  }

  updateCamera(camera: Camera): void {
    if (!camera._id) { return; }
    this.cameraService.updateCamera(camera._id, camera).subscribe(() => {
      this.loadCameras();
      this.selectedCamera = undefined;
    });
  }

  deleteCamera(id: string): void {
    this.cameraService.deleteCamera(id).subscribe(() => {
     // this.loadCameras();
     window.location.reload();

      this.selectedCamera = undefined;
    });
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
        this.cameraService.deleteCamera(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'The item has been deleted.', 'success');
            this.loadCameras(); // Refresh automatically after successful deletion
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


  searchTerm: string = ''; // Terme de recherche


clearSearch() {
  this.searchTerm = '';
}

// Méthode pour filtrer les équipements en fonction du terme de recherche
filterCameras(): Camera[] {
  return this.cameras.filter((cam) =>
    (cam.name && cam.name.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
    (cam.modele && cam.modele.toLowerCase().includes(this.searchTerm.toLowerCase()))
  );
}

}
