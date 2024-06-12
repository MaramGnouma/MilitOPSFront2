export interface Experience {
  type: string;
  annee: Date;
}

export interface Specialization {
  name: string;
  niveau: string;
}

export interface Certification {
  nom: string;
  dateObtention: Date;
}

export interface Competence {
  nom: string;
  niveau: string;
}

export interface User {
  _id?: string;
  name: string; // J'ai changé "firstname" et "lastname" en "name" pour correspondre au schéma Node.js
  genre: string;
  datebirth: Date;
  idMilitaire: number;
  adresse: string;
  telephone: string;
  unitAffectation: string;
  etatCivil: string;
  email: string;
  image: string;
  cv: string;
  dateEngagement: Date;

  experiences: Experience[];
  specializations: Specialization[];
  certifications: Certification[];
  competences: Competence[];
  role?: 'Supervisor' | 'Controller'; // Utilisation d'un type union pour limiter les valeurs possibles
  status?: 'Pending' | 'Accepted'; // Rendre status facultatif avec '?'
  password?: string;
  photo?: string; 
  

  


  // Photo est facultatif, donc j'ai ajouté un '?' devant
}
