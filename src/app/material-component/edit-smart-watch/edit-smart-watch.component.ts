import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MontreService } from 'src/app/services/montre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-smart-watch',
  templateUrl: './edit-smart-watch.component.html',
  styleUrls: ['./edit-smart-watch.component.css']
})
export class EditSmartWatchComponent implements OnInit {
  @Input() smartwatchData: any;
  constructor(private montreService:MontreService,private activeModal: NgbActiveModal,private router:Router) { }
  selectedImage: string | ArrayBuffer | null = null;

  ngOnInit(): void {
  }

  /*
  saveChanges() {
    if (this.selectedImage) {
      this.smartwatchData.photo = this.selectedImage as string;
    }
  
    this.montreService.updateMontre(this.smartwatchData._id, this.smartwatchData).subscribe(updatedUser => {
      // Message de succès
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Successfully updated SmartWatch.'
      }).then((result) => {
        // Redirection ou autre action après que l'utilisateur a appuyé sur OK
        if (result.isConfirmed || result.isDismissed) {
          this.closeModal();
          this.refreshPage();
        }
      });
    }, error => {
      // Message d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error updating SmartWatch. Please try again later.'
      });
      console.error('Erreur lors de la mise à jour de SmartWatch :', error);
    });
  }*/


    saveChanges(smartwatchForm: NgForm) {
      if (smartwatchForm.invalid) {
        // Message d'erreur si le formulaire est invalide
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Please fill out all required fields.'
        });
        return;
      }
  
      if (this.selectedImage) {
        this.smartwatchData.photo = this.selectedImage as string;
      }
  
      this.montreService.updateMontre(this.smartwatchData._id, this.smartwatchData).subscribe(updatedUser => {
        // Message de succès
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Successfully updated SmartWatch.'
        }).then((result) => {
          // Redirection ou autre action après que l'utilisateur a appuyé sur OK
          if (result.isConfirmed || result.isDismissed) {
            this.closeModal();
            this.refreshPage();
          }
        });
      }, error => {
        // Message d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error updating SmartWatch. Please try again later.'
        });
        console.error('Erreur lors de la mise à jour de SmartWatch :', error);
      });
    }
  closeModal() {
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
  refreshPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/montre_connecte']);
    });
  }

}


