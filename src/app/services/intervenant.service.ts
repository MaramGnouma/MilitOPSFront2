import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Intervenant } from '../Models/intervenant';

@Injectable({
  providedIn: 'root'
})
export class IntervenantService {

  private baseUrl = 'http://localhost:5000'; // Remplacez cela par l'URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour créer un nouvel intervenant
  createIntervenant(intervenantData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/soldats`, intervenantData);
  }

  // Méthode pour récupérer tous les intervenants
  getIntervenants(): Observable<Intervenant[]> {
    return this.http.get<Intervenant[]>(`${this.baseUrl}/soldats`);
  }

  // Méthode pour récupérer un intervenant par ID
  getIntervenantById(id: string): Observable<Intervenant> {
    return this.http.get<Intervenant>(`${this.baseUrl}/soldats/${id}`);
  }

  // Méthode pour mettre à jour un intervenant
  updateIntervenant(id: string, intervenantData: Intervenant): Observable<Intervenant> {
    return this.http.put<Intervenant>(`${this.baseUrl}/soldats/${id}`, intervenantData);
  }

  
  // Méthode pour supprimer un intervenant
  deleteIntervenant(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/soldats/${id}`);
  }
}
