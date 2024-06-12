export interface Camera {
  _id?: string;
  name: string;
  photo: string;
  quantite: number;
  disponible: boolean;
  description: string[];
  modele: string;
  technologie: string; // facultatif
  capteur: string; // facultatif
  resolution: string; // facultatif
  dimensions: string; // facultatif
}
