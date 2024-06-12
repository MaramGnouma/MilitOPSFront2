import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {

  constructor(private builder: FormBuilder,private httpClient: HttpClient,private intervenantServ:UserService,private router:Router) { }
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
        password: ['', Validators.required],
        role: ['', Validators.required],
        status: ['Accepted', Validators.required],
        image: [null,Validators.required],
        cv: [null],
        email: ['', [Validators.required,Validators.email]],
        genre: ['', Validators.required],
        dateBirth: ['', [Validators.required, this.notFutureOrCurrentDateValidator]],
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
        const cloudinaryResponse = await axios.post('http://api.cloudinary.com/v1_1/deezublk9/upload', form);
        const imageUrl = cloudinaryResponse.data.secure_url;
        console.log('Image uploaded successfully:', imageUrl);
  
        const cvForm = new FormData();
        cvForm.append('file', this.selectedFile2);
        cvForm.append('upload_preset', 'maramgnouma');
  
        const cvCloudinaryResponse2 = await axios.post('http://api.cloudinary.com/v1_1/deezublk9/upload', cvForm);
        const cvUrl = cvCloudinaryResponse2.data.secure_url;
        console.log('CV uploaded successfully:', cvUrl);
  
        const basicForm = this.Basic.value;
        const formationForm = this.Formation.value;
        const competencesForm = this.Competence.value;
        basicForm.image = imageUrl;
        basicForm.cv = cvUrl;
  
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
  
        this.intervenantServ.createUser(intervenantdata).subscribe(
          (response) => {
            this.router.navigate(['/users_approuves']);
            this.initForm();
            console.log('User created successfully :', response);
            Swal.fire({
              title: 'Success!',
              text: 'User created successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          (error) => {
            console.error('Error while creating the user :', error);
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred during user creation. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
      } catch (error) {
        console.error('Error uploading the file to Cloudinary:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while uploading the file to Cloudinary. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      Swal.fire({
        title: 'ERROR!',
        text: 'The form is invalid or no file selected. Please check the required fields.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
  
  
/*
  async onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

  }*/
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
/*
HandleSubmit(){
  if(this.Empregister.valid){
    console.log(this.Empregister.value);
  }
}
*/

  HandleSubmit() {
    if (this.Empregister.invalid) {
      this.markFormGroupTouched(this.Empregister);
      Swal.fire({
        title: 'Please fill in all other fields correctly.',
      
        confirmButtonText: 'OK'
      });
      return;
    }
    console.log(this.Empregister.value);
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
      if (control instanceof FormArray) {
        control.controls.forEach((group: AbstractControl) => this.markFormGroupTouched(group as FormGroup));
      }
    });
  }
  
  
}
