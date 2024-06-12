import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipement } from 'src/app/Models/materielsTerrain';
import { MaterielsTerrainService } from 'src/app/services/materiels-terrain.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-materiels-terrain',
  templateUrl: './add-materiels-terrain.component.html',
  styleUrls: ['./add-materiels-terrain.component.css']
})
export class AddMaterielsTerrainComponent {

  newEquipement: Equipement = {
    name: '', 
    quantite:0 , 
    desscription: '',
    disponible:true,
    photo:'',
    armements:[],
    accessoires:[],
    dimensions:[]
  }; // Modèle d'équipement vide pour le formulaire

  constructor(private materielsService: MaterielsTerrainService,private router:Router,private activeModal: NgbActiveModal) { }

  onSubmit(): void {
    if (!this.isValidForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all the fields!',
      });
      return;
    }
    this.newEquipement.photo = this.selectedImage as string;

    this.materielsService.createEquipement(this.newEquipement).subscribe(
      (response) => {
        console.log('Équipement ajouté avec succès:', response);
        Swal.fire("Success!", "The firearm has been successfully added.", "success").then(() => {
          // Rafraîchir la page après la mise à jour et l'affichage du message
          window.location.reload();
        });
        // Naviguer vers la page de liste des caméras après mise à jour
        this.closeModal();;
        
        

      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'équipement:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please fill in all the fields!',
        });
      }
    );
  }


  isValidForm(): boolean {
    return this.newEquipement.name.trim() !== '' &&
    this.selectedImage !== null &&
    this.newEquipement.quantite > 0 &&
    this.newEquipement.name.trim() !== '' &&
  
    this.newEquipement.desscription.trim() !== '' &&
    this.newEquipement.armements.every(desc => desc.trim() !== '') &&
    this.newEquipement.accessoires.every(desc => desc.trim() !== '') &&
    this.newEquipement.dimensions.every(desc => desc.trim() !== '');
  }

  equipements: Equipement[] = []; // Initialisation de la liste d'équipements

  loadequipemnts(): void {
    this.materielsService.getEquipements().subscribe((data: Equipement[]) => {
      this.equipements = data;
    });
  }
  selectedImage: string | ArrayBuffer | null = null;




  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = 'assets/' + files[0].name; 
        this.newEquipement.photo = this.selectedImage; // Chemin relatif de l'image
      };
      reader.readAsDataURL(files[0]);
    }
  }
  
  annuler(){
    this.router.navigate(['/materiels']);
  }
  closeModal() {
    this.activeModal.dismiss('Cross click'); // 'Cross click' est le motif de fermeture facultatif
  }
  clearSelectedFile(): void {
    this.selectedImage = null;
    
  }

  ngOnInit(): void {
  }



  addArmements() {
    this.newEquipement.armements.push('');
  }
  addaccessoires() {
    this.newEquipement.accessoires.push('');
  }
  adddimensions() {
    this.newEquipement.dimensions.push('');
  }

  private resetForm() {
    this.newEquipement = {
      name: '', 
      quantite:0 , 
      desscription: '',
      disponible:true,
      photo:'',

      armements:[],
      accessoires:[],
      dimensions:[]
      
    };
  }




onFileSelected(event: Event): void {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedImage = 'assets/' + files[0].name;
    };
    reader.readAsDataURL(files[0]);
  }
}

getSelectedFileUrl(): string | null {
  return this.selectedImage as string;
}

}
