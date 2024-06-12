import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { IntervenantService } from 'src/app/services/intervenant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-intervenant',
  templateUrl: './add-intervenant.component.html',
  styleUrls: ['./add-intervenant.component.css']
})
export class AddIntervenantComponent {
  constructor(private builder: FormBuilder,private httpClient: HttpClient,private intervenantServ:IntervenantService,private router:Router) { }
  isLinear=true;
  Empregister!: FormGroup;
  maxSize = 104857600;
  selectedFile: File | null = null;
  selectedFile2: File | null = null;
  ngOnInit(): void {
    this.initForm();
  }
  notFutureOrCurrentDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      return { 'futureDate': true };
    }
    return null;
  }

  initForm(): void {
    this.Empregister = this.builder.group({
      basic: this.builder.group({
        name: ['', Validators.required],
        idMilitaire: ['', Validators.required],
        adresse: ['', Validators.required],
        telephone: ['', [Validators.required,Validators.maxLength(8)]],
        etatCivil: ['', Validators.required],
        image: [null,Validators.required],
        cv: [null,Validators.required],
        email: ['', [Validators.required,Validators.email]],
        genre: ['', Validators.required],
        datebirth: ['', [Validators.required, this.notFutureOrCurrentDateValidator]],
      }),
      formation: this.builder.group({
        dateEngagement: ['',[Validators.required, this.notFutureOrCurrentDateValidator]],
        unitAffectation: ['', Validators.required],
        experiences:this.builder.array([], Validators.required),
        specializations: this.builder.array([], Validators.required)
      }),
      competence: this.builder.group({
        certificationsArray: this.builder.array([], Validators.required),
        competencesArray: this.builder.array([], Validators.required)
      })
    });
  }
  get experiencesArray() {
    return this.Formation.get('experiences') as FormArray;
  }
  get specializationsArray() {
    return this.Formation.get('specializations') as FormArray;
  }
  get certificationsArray() {
    return this.Competence.get('certificationsArray') as FormArray;
  }

  get competencesArray() {
    return this.Competence.get('competencesArray') as FormArray;
  }


  createExperienceFormGroup() {
    return this.builder.group({
      type: ['', Validators.required],
      annee: ['',[Validators.required, this.notFutureOrCurrentDateValidator]],
    });
  }

  addExperienceRow() {
    this.experiencesArray.push(this.createExperienceFormGroup());
  }

  removeExperienceRow(index: number) {
    this.experiencesArray.removeAt(index);
  }


  createSpecializationFormGroup(): FormGroup {
    return this.builder.group({
      name: ['', Validators.required],
      level: ['',Validators.required]
    });
  }

  addSpecializationRow() {
    this.specializationsArray.push(this.createSpecializationFormGroup());
  }

  removeSpecializationRow(index: number) {
    this.specializationsArray.removeAt(index);
  }

  get Basic() {
    return this.Empregister.get('basic') as FormGroup;
  }

  get Formation(){
    return this.Empregister.get("formation") as FormGroup;
  }

  get Competence(){
    return this.Empregister.get("competence") as FormGroup;
  }

  HandleSubmit(){
    if(this.Empregister.valid){
      console.log(this.Empregister.value);
    }
  }

  createCertificationRow() {
    return this.builder.group({
      nom: ['', Validators.required],
      dateObtention: ['', [Validators.required, this.notFutureOrCurrentDateValidator]]
    });
  }

  addCertificationRow() {
    this.certificationsArray.push(this.createCertificationRow());
  }

  removeCertificationRow(index: number) {
    this.certificationsArray.removeAt(index);
  }

  createCompetenceRow() {
    return this.builder.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required]
    });
  }

  addCompetenceRow() {
    this.competencesArray.push(this.createCompetenceRow());
  }

  removeCompetenceRow(index: number) {
    this.competencesArray.removeAt(index);
  }




  async submit(): Promise<void> {

    if (this.Empregister.valid) {
      if (!this.selectedFile || !this.selectedFile2) {
        Swal.fire({
          title: 'Erreur!',
          text: 'Veuillez sélectionner les fichiers requis (image et CV).',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      const form = new FormData();
      form.append('file', this.selectedFile);
      form.append('upload_preset', 'maramgnouma'); // Cloudinary upload preset

      try {
        // Envoyer le fichier "image" à Cloudinary
        const cloudinaryResponse = await axios.post('http://api.cloudinary.com/v1_1/deezublk9/upload', form);
        const imageUrl = cloudinaryResponse.data.secure_url;
        console.log('Image uploaded successfully:', imageUrl);

        // Continuer avec l'envoi du fichier "cv" à Cloudinary

        /*
        const cvForm = new FormData();
        cvForm.append('file', this.selectedFile2);
        cvForm.append('upload_preset', 'maramgnouma'); // Cloudinary upload preset

        const cvCloudinaryResponse2 = await axios.post('http://api.cloudinary.com/v1_1/deezublk9/upload', cvForm);
        const cvUrl = cvCloudinaryResponse2.data.secure_url;
        console.log('CV uploaded successfully:', cvUrl);*/

const cvFileName = this.Basic.value.cvFileName; // Assurez-vous que ce champ existe dans votre formulaire

// Charger le fichier CV depuis le dossier assets
const cvUrl = `assets/${cvFileName}`; // Construire le chemin complet du fichier CV
console.log('CV loaded successfully:', cvUrl);

        // Mettre à jour les URLs de l'image et du CV dans les données du formulaire
        const basicForm = this.Basic.value;
        const formationForm = this.Formation.value;
        const competencesForm = this.Competence.value;
        basicForm.image = imageUrl;
        basicForm.cv = cvUrl;
console.log(cloudinaryResponse.data.secure_url);
console.log(this.experiencesArray.value);
        // Créer l'objet intervenantdata
        const intervenantdata = {
          ...basicForm,
          ...formationForm,
          ...competencesForm,
          experiences: this.experiencesArray.value.map((experience: any) => ({
            type: experience.type,
            annee: new Date(experience.annee)
          })),
                   specializations: this.specializationsArray.value,
          certifications: this.certificationsArray.value,
          competences: this.competencesArray.value,
        };

        // Appeler le service pour créer l'intervenant avec les URLs de l'image et du CV
        this.intervenantServ.createIntervenant(intervenantdata).subscribe(
          (response) => {
            this.router.navigate(['/soldats']);

      // Réinitialiser le formulaire après la soumission réussie
      this.initForm();
            console.log('Intervenant créé avec succès :', response);
            // Afficher SweetAlert de succès
            Swal.fire({
              title: 'Succès!',
              text: 'Intervenant créé avec succès',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          (error) => {
            console.error('Erreur lors de la création de l\'intervenant :', error);
            // Afficher SweetAlert d'erreur
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur est survenue lors de la création de l\'intervenant. Veuillez réessayer.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      } catch (error) {
        console.error('Erreur lors de l\'envoi du fichier à Cloudinary :', error);
        // Afficher SweetAlert d'erreur
        Swal.fire({
          title: 'Erreur!',
          text: 'Une erreur est survenue lors de l\'envoi du fichier à Cloudinary. Veuillez réessayer.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      console.error('Le formulaire est invalide ou aucun fichier sélectionné.');
      // Afficher SweetAlert d'erreur
      Swal.fire({
        title: 'Erreur!',
        text: 'Le formulaire est invalide ou aucun fichier sélectionné. Veuillez vérifier les champs obligatoires.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }



// Propriété pour contenir l'URL de l'image sélectionnée
selectedImageURL: string | ArrayBuffer | null = null;
selectedCVURL: string | ArrayBuffer | null = null;

// Sélection du fichier image
onFileSelected(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    this.selectedFile = target.files[0]; // Assigner le fichier sélectionné
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedImageURL = e.target?.result as string;
    };
    reader.readAsDataURL(target.files[0]);
  }
}

// Sélection du fichier CV
onFileSelected2(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    this.selectedFile2 = target.files[0]; // Assigner le fichier sélectionné
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedCVURL = e.target?.result as string;
    };
    reader.readAsDataURL(target.files[0]);
  }
}
}
