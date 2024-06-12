import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  //intervenant: User = new User(); // Initialisez un nouvel intervenant
  intervenant: User = {
    name: '', // Initialisez toutes les propriétés requises ici
    genre: '',
    datebirth: new Date(),
    idMilitaire: 0,
    adresse: '',
    telephone: '',
    etatCivil: '',
    email: '',
    image: '',
    cv: '',
    dateEngagement: new Date(),
    unitAffectation: '',
    experiences: [],
    specializations: [],
    certifications: [],
    competences: []
  };
  constructor(
    private intervenantService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; // Récupérez l'ID de l'intervenant depuis les paramètres d'URL
      if (id) {
        this.getIntervenant(id); // Chargez les détails de l'intervenant à modifier
      }
    });
  }
  ajouterExperience(): void {
    this.intervenant.experiences.push({ type: '', annee: new Date() });
  }
  getIntervenant(id: string): void {
    this.intervenantService.getUserById(id).subscribe(intervenant => {
      console.log('Intervenant:', intervenant);
      this.intervenant = intervenant;
  
      if (this.intervenant && this.intervenant.certifications) {
        this.intervenant.certifications.forEach(certification => {
          certification.dateObtention = new Date(certification.dateObtention);
          console.log(certification.dateObtention);
          this.intervenant.datebirth = this.convertStringToDate('2024-04-04'); // Exemple de conversion pour une chaîne donnée
  
  
        });
  
        
      }
  
      if (this.intervenant && this.intervenant.experiences) {
        this.intervenant.experiences.forEach(certification => {
          certification.annee = new Date(certification.annee);
        //  this.intervenant.birth = this.convertStringToDate('2024-04-04'); // Exemple de conversion pour une chaîne donnée
  
  
        });
  
      }
  
      
    });
  }
  
  
  /*
  ajouterCertification(): void {
    this.intervenant.certifications.push({ nom: '', dateObtention: new Date() });
  }
  */
  
  selectedImage: string | ArrayBuffer | null = null;
  
   
  
  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
        this.intervenant.image = this.selectedImage; // Mettre à jour l'URL de l'image dans intervenant.image
      };
      reader.readAsDataURL(target.files[0]);
    }
  }
  
  
    clearSelectedFile(): void {
      this.selectedImage = null;
      
    }
  
    getSelectedFileUrl(): string | null {
      if (this.selectedImage) {
        return this.selectedImage as string; // Utilisation directe de l'URL sans createObjectURL
      } else {
        return null;
      }
    }
  
    ajouterCertification(): void {
      // Déclarer une variable i pour utiliser dans la boucle ou pour accéder à un index spécifique
      const i = this.intervenant.certifications.length; // Par exemple, la longueur actuelle du tableau
      // Utiliser moment.js pour analyser la chaîne de caractères en objet Date
      const dateObtention = moment(this.intervenant.certifications[i].dateObtention).toDate();
      this.intervenant.certifications.push({ nom: '', dateObtention: dateObtention });
    }
  
  ajouterSpecialization() {
    const i = this.intervenant.certifications.length; // Par exemple, la longueur actuelle du tableau
   // const dateObtention = moment(this.intervenant.certifications[i].dateObtention).toDate();
  
    // Ajouter une nouvelle spécialisation avec un nom vide
    this.intervenant.specializations.push({ name: '' ,niveau:''});
    console.log('Spécialisation ajoutée:', this.intervenant.specializations);
  }
  
  ajouterCompetence() {
    // Ajouter une nouvelle compétence avec un nom vide
    this.intervenant.competences.push({ nom: '',niveau:'' });
    console.log('Compétence ajoutée:', this.intervenant.competences);
  }
  
  
  supprimerCertification(index: number): void {
    this.intervenant.certifications.splice(index, 1);
  }
  /*
  formatDate(date: Date): string {
    return date ? date.toISOString().slice(0, 10) : '';
  }*/
  formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }
  
  // Méthode pour convertir une chaîne en objet Date
  convertStringToDate(dateString: string): Date {
    const dateParts = dateString.split('-');
    // Attention : le mois dans JavaScript est 0-indexé, donc soustrayez 1 au mois
    return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
  }
  
  
   
  /*
  formatDate(date: any): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US'); // Formatage de la date
  }*/

    modifierIntervenant(): void {
      if (this.intervenant && this.intervenant._id) {
        this.intervenantService.updateUser(this.intervenant._id, this.intervenant).subscribe(
          () => {
            Swal.fire({
              title: 'Success!',
              text: 'Mission agent successfully updated.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
           this.router.navigate(['/users_approuves']); 
         //  window.location.reload(); // Rafraîchir la page après la modification
           // Redirigez vers la liste après la modification
            });
          },
          (error) => {
            console.error('Error updating Mission agent:', error);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while updating the Mission agent. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      }
    }
    
  selectedCV: File | null = null;
  pdfSrc: string | undefined; // Déclaration de pdfSrc

  cvVisible: boolean = false;

  handleCVFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.selectedCV = target.files[0];
      this.intervenant.cv = this.selectedCV.name; // Mettre à jour le nom du CV dans intervenant.cv
      // Définir pdfSrc pour afficher le PDF dans le pdf-viewer
      const reader = new FileReader();
      reader.onload = (e) => {
        this.pdfSrc = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedCV);
    }
  }

  clearSelectedCV(): void {
    this.selectedCV = null;
    this.intervenant.cv = ''; // Effacer le nom du CV dans intervenant.cv
    this.pdfSrc = undefined; // Effacer pdfSrc pour cacher le pdf-viewer
  }

  getSelectedCVName(): string | null {
    if (this.selectedCV) {
      return this.selectedCV.name;
    } else {
      return null;
    }
  }

  toggleCVVisibility() {
    this.cvVisible = !this.cvVisible;
  }
}
