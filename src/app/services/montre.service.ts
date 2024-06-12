import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Montre } from '../material-component/montre';

@Injectable({
  providedIn: 'root'
})
export class MontreService {

  private baseUrl = 'http://localhost:5000/montres'; // Assurez-vous de remplacer l'URL par celle de votre serveur

  constructor(private http: HttpClient) { }

  getAllMontres(): Observable<Montre[]> {
    return this.http.get<Montre[]>(this.baseUrl);
  }

  getMontreById(id: string): Observable<Montre> {
    return this.http.get<Montre>(`${this.baseUrl}/${id}`);
  }

  createMontre(montre: Montre): Observable<Montre> {
    return this.http.post<Montre>(this.baseUrl, montre);
  }

  updateMontre(id: string, montre: Montre): Observable<Montre> {
    return this.http.put<Montre>(`${this.baseUrl}/${id}`, montre);
  }

  deleteMontre(id: string): Observable<Montre> {
    return this.http.delete<Montre>(`${this.baseUrl}/${id}`);
  }
}
