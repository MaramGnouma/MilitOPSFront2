export interface Montre {
  _id?: string;
  nom: string;
  modele: string;
  os: string;
  size: string;
  connectivity: string;
  batteryLife: string;
  fonctionnalites?: string;
  photo?: string;
  marque: string;
  affichage?: string;
  quantite?: number;          // optional
  description?: string;       // optional
  disponible?: boolean;     
}
