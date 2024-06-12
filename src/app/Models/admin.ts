export interface Admin {
    _id?: string; // Identifiant (optionnel car il peut être généré par la base de données)
    name: string;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    adresse: string;
    city: string;
    country: string;
    codepostal: number;
    aboutMe:string;
    password?: string; // Mot de passe (optionnel, selon vos besoins)
  }
  