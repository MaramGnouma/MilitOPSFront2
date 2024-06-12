import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MontreService } from 'src/app/services/montre.service';
import { Montre } from '../montre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-smartwatch-modal',
  templateUrl: './add-smartwatch-modal.component.html',
  styleUrls: ['./add-smartwatch-modal.component.css']
})
export class AddSmartwatchModalComponent {


  addSmartwatchForm!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    public activeModal: NgbActiveModal, 
    private serviceMontre: MontreService, 
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.addSmartwatchForm = this.fb.group({
      nom: ['', Validators.required], // Champ nom avec validateur requis
      modele: ['', Validators.required], // Champ modele avec validateur requis
      os: ['', Validators.required], // Champ os avec validateur requis
      size: ['', Validators.required], // Champ size avec validateur requis
      connectivity: ['', Validators.required], // Champ connectivity avec validateur requis
      batteryLife: ['', Validators.required], // Champ batteryLife avec validateur requis
      marque: ['', Validators.required], // Champ marque avec validateur requis
      fonctionnalites: ['', Validators.required], // Champ fonctionnalites avec validateur requis
      affichage: ['', Validators.required] ,
      photo: ['', Validators.required] ,
      quantite :[0, Validators.required] ,
      disponible : [true, Validators.required] ,
      description: ['', Validators.required], 
      // Champ affichage avec validateur requis
    });
  }

  saveChanges(): void {
    if (this.addSmartwatchForm.valid) {
      const newMontre: Montre = this.addSmartwatchForm.value;
      newMontre.photo = this.selectedImage as string; // Affecter la valeur de selectedImage à photo
      this.serviceMontre.createMontre(newMontre).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The new watch has been successfully added.',
        }).then(() => {
          this.activeModal.close('success');
          window.location.reload();
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all the fields!',
      });
    }
  }
  

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = 'assets/' + files[0].name; 
        //this.newMontre.photo = this.selectedImage; // Chemin relatif de l'image
      };
      reader.readAsDataURL(files[0]);
    }
  }

  clearSelectedFile(): void {
    this.selectedImage = null;
    this.addSmartwatchForm.patchValue({
      photo: ''
    });
  }

  getSelectedFileUrl(): string | null {
    if (this.selectedImage) {
      return this.selectedImage as string;
    } else {
      return null;
    }
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }
}
