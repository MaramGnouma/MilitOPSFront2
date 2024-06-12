import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Certification, Competence, Experience, Specialization, User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-mission-agent',
  templateUrl: './edit-mission-agent.component.html',
  styleUrls: ['./edit-mission-agent.component.css']
})
export class EditMissionAgentComponent {

  editUserForm!: FormGroup;
  user!: User;
  userId: string = ''; // Déclaration et initialisation de userId


  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    // Initialiser le formulaire
    this.editUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      genre: ['', Validators.required],
      datebirth: ['', Validators.required],
      idMilitaire: [0, Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      etatCivil: ['', Validators.required],
      email: ['', [Validators.required, this.validateEmail]], // Utilisation de la méthode de validation personnalisée
      image: ['', Validators.required],
     // cv: ['', Validators.required],
     
      dateEngagement: ['', Validators.required],
      unitAffectation: ['', Validators.required],
      experiences: this.formBuilder.array([]),
      specializations: this.formBuilder.array([]),
      certifications: this.formBuilder.array([]),
      competences: this.formBuilder.array([])
    });

    // Récupérer l'utilisateur à éditer (vous devez implémenter cette méthode dans votre service UserService)
    this.route.params.subscribe((params: Params) => { // Spécifiez le type de params comme Params
      const id = params['id']; // Récupérez l'ID de l'intervenant depuis les paramètres d'URL
      if (id) {
        this.getAgentMIssion(id); // Chargez les détails de l'intervenant à modifier
      }
    });
  }

    // Méthode de validation personnalisée pour l'e-mail
    validateEmail(control: AbstractControl): ValidationErrors | null {
      const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (control.value && !emailPattern.test(control.value)) {
        return { 'invalidEmail': true }; // Retourne une erreur si l'e-mail est invalide
      }
      return null; // Retourne null si l'e-mail est valide
    }

  getAgentMIssion(id: string): void {
    this.userService.getUserById(id).subscribe(missionagent => {
      console.log('Mission agent:', missionagent);
      this.user = missionagent;
      this.patchForm(); // Appelez patchForm ici après avoir reçu les détails de l'utilisateur


    });
  }

  
  patchForm(): void {
    this.editUserForm.patchValue({
      name: this.user.name,
      genre: this.user.genre,
      datebirth: this.formatDate(this.user.datebirth),
      idMilitaire: this.user.idMilitaire,
      adresse: this.user.adresse,
      telephone: this.user.telephone,
      etatCivil: this.user.etatCivil,
      email: this.user.email,
      image: this.user.image,
      cv: this.user.cv,

      dateEngagement: this.formatDate(this.user.dateEngagement),
      unitAffectation: this.user.unitAffectation,
    
      // Patchez le reste des champs d'informations utilisateur ici
    });
  
    // Patchez les compétences
    this.patchCompetences();
    this.patchexperiences();
    this.patchcertifications();
    this.patchspecializations();
  }


  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  get competences(): FormArray {
    return this.editUserForm.get('competences') as FormArray;
  }

  get experiences(): FormArray {
    return this.editUserForm.get('experiences') as FormArray;
  }
  get specializations(): FormArray {
    return this.editUserForm.get('specializations') as FormArray;
  } 
   get certifications(): FormArray {
    return this.editUserForm.get('certifications') as FormArray;
  }
  patchspecializations(): void {
    this.user.specializations.forEach((competence: Specialization) => {
      this.specializations.push(this.formBuilder.group({
        name: [competence.name, Validators.required],
        niveau: [competence.niveau, Validators.required]
      }));
    });
  }

  patchcertifications(): void {
    this.user.certifications.forEach((competence: Certification) => {
      this.certifications.push(this.formBuilder.group({
        nom: [competence.nom, Validators.required],
        dateObtention: [this.formatDate(competence.dateObtention), Validators.required]
      }));
    });
  }


  patchexperiences(): void {
    this.user.experiences.forEach((competence: Experience) => {
      this.experiences.push(this.formBuilder.group({
        type: [competence.type, Validators.required],
        annee: [this.formatDate(competence.annee), Validators.required]
      }));
    });
  }


  patchCompetences(): void {
    this.user.competences.forEach((competence: Competence) => {
      this.competences.push(this.formBuilder.group({
        nom: [competence.nom, Validators.required],
        niveau: [competence.niveau, Validators.required]
      }));
    });
  }

  addCompetence(): void {
    this.competences.push(this.formBuilder.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required]
    }));
  }

  removeCompetence(index: number): void {
    this.competences.removeAt(index);
  }


  addspecializations(): void {
    this.specializations.push(this.formBuilder.group({
      name: ['', Validators.required],
      niveau: ['', Validators.required]
    }));
  }

  removespecializations(index: number): void {
    this.specializations.removeAt(index);
  }


  addcertifications(): void {
    this.certifications.push(this.formBuilder.group({
      nom: ['', Validators.required],
      dateObtention: ['', Validators.required]
    }));
  }

  removecertifications(index: number): void {
    this.certifications.removeAt(index);
  }

  addexperiences(): void {
    this.experiences.push(this.formBuilder.group({
      type: ['', Validators.required],
      annee: ['', Validators.required]
    }));
  }

  removeexperiences(index: number): void {
    this.experiences.removeAt(index);
  }
  return() {
    Swal.fire({
      
      text: 'You will be redirected to the approved mission agents page.',
      icon: 'question',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/users_approuves']);
      }
    });
  }

  

  onSubmit(): void {
    if (this.editUserForm.valid && this.user && this.user._id) {
      // Enregistrer les modifications de l'utilisateur
      this.userService.updateUser(this.user._id, this.editUserForm.value).subscribe(
        response => {
          console.log('MIssion Agent updated successfully:', response);
          Swal.fire({
            title: 'Success!',
            text: 'Mission agent successfully updated.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
         this.router.navigate(['/users_approuves']); 
          // Rediriger l'utilisateur vers une autre page ou effectuer une autre action après la mise à jour
        }, 
        error => {
          console.error('Error updating user:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the Mission agent. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          // Afficher un message d'erreur à l'utilisateur ou gérer l'erreur d'une autre manière
        }
      );
    }
      );
  
}
}

onFileSelected(event: any): void {
  const fileInput = event.target;
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    // Maintenant, vous pouvez stocker ou afficher le nom du fichier sélectionné
    console.log("File selected:", file.name);
  }
}



}
