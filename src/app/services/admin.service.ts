import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../Models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:5000/admin'; // Remplacez ceci par l'URL de votre API back-end

  constructor(private http: HttpClient) { }

  getAdmin(): Observable<Admin> { // Utilisation de Admin comme type de retour
    return this.http.get<Admin>(`${this.apiUrl}`);
  }

  updateAdmin(adminData: Admin): Observable<Admin> { // Utilisation de Admin comme type de paramètre
    return this.http.put<Admin>(`${this.apiUrl}`, adminData);
  }
}
