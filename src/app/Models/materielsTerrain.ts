export interface Equipement {

  _id?: string;
  name: string;
  photo: string;
  quantite: number;
  disponible: boolean;
  armements: string[];
  accessoires: string[];
  desscription: string;
  dimensions: string[];
}
