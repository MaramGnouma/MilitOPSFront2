export class Intervenant {
  _id?: string;
  name: string;
  genre: string;
  datebirth: Date;
  idMilitaire: number;
  adresse: string;
  telephone: string;
  etatCivil: string;
  email: string;
  image: string;
  cv: string;
  dateEngagement: Date;
  unitAffectation: string;
  experiences: { type: string, annee: Date }[];
  specializations: { name: string, niveau: string }[];
  certifications: { nom: string, dateObtention: Date }[]; // Ajout du champ dateObtention
  competences: { nom: string, niveau: string }[];
  
  constructor() {
    this._id = '';
    this.name = '';
    this.genre = '';
    this.datebirth = new Date();
    this.idMilitaire = 0;
    this.adresse = '';
    this.telephone = '';
    this.etatCivil = '';
    this.email = '';
    this.image = '';
    this.cv = '';
    this.dateEngagement = new Date();
    this.unitAffectation = '';
    this.experiences = [];
    this.specializations = [];
    this.certifications = [];
    this.competences = [];
  }
}
