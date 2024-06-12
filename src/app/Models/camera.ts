export interface Camera {
  _id?: string;
  name: string;
  photo: string;
  quantite: number;
  disponible: boolean;
  description: string[];
  modele: string;
  technologie: string;
  capteur: string;
  resolution: string;
  dimensions: string;// facultatif
}
