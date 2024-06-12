import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Authe2Service {

  user!: User;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


   isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  constructor(private http: HttpClient) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }

  forgotPassword(email: string) {
    return this.http.post<any>('http://localhost:5000/forgot-password', { email });
  }

  resetPassword(id: string, token: string, password: string) {
    return this.http.post<any>(`http://localhost:5000/reset-password/${id}/${token}`, { password });
  }


  register(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:5000/register', user);
  }





  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:5000/loginAdmin', credentials)
      .pipe(
        tap(response => {
          // Mettre à jour le localStorage après une connexion réussie
          localStorage.setItem('token', response.token);
          console.log(response.token);
          localStorage.getItem('token')
          this.isLoggedInSubject.next(true);
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    console.log('Token removed:', localStorage.getItem('token')); // Vérifiez la valeur du token après la déconnexion
    this.isLoggedInSubject.next(false);
    return this.http.post<any>('http://localhost:5000/logoutAdmin', {});
  }
  
  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/userr');
      
  }

  getUserr(): any {
    // Récupérer l'utilisateur à partir du stockage local ou de session
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getToken(): string | null {
    // Récupérer le token à partir du stockage local ou de session
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    // Vérifier si l'utilisateur est authentifié en vérifiant la présence du token
    const token = this.getToken();
    return token !== null;
  }
}
