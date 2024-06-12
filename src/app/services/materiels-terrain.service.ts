import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipement } from '../Models/materielsTerrain';

@Injectable({
  providedIn: 'root'
})
export class MaterielsTerrainService {

  private apiUrl = 'http://localhost:5000/equipements'; // Mettez à jour avec votre URL API

  constructor(private http: HttpClient) {}

  getEquipements(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.apiUrl);
  }

  getEquipementById(id: string): Observable<Equipement> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Equipement>(url);
  }

  createEquipement(equipement: Equipement): Observable<Equipement> {
    return this.http.post<Equipement>(this.apiUrl, equipement);
  }

  updateEquipement(id: string, equipement: Equipement): Observable<Equipement> {
    //const url = `${this.apiUrl}/${id}`;
    //return this.http.put<Equipement>(url, equipement);
    return this.http.put<Equipement>(`${this.apiUrl}/${id}`, equipement);

  }
  /*
  updateMontre(id: string, montre: Montre): Observable<Montre> {
    return this.http.put<Montre>(`${this.baseUrl}/${id}`, montre);
  }*/


  deleteEquipement(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
