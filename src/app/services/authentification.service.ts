import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private apiUrl = 'http://localhost:5000'; // Remplace avec l'URL de ton backend

  constructor(private http: HttpClient) {}


  register(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userDetails);
  }
/*
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-user`, { email, password },{ withCredentials: true
    });
  }*/

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:5000/login-user', { email, password });
  }
}
