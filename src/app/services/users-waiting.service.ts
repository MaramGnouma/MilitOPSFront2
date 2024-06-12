import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { map } from 'rxjs/operators'; // Importez l'opérateur map depuis rxjs/operators
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersWaitingService {


  private apiUrl = 'http://localhost:5000/agents'; // Mettez à jour avec votre URL d'API

  constructor(private userService: UserService, private http: HttpClient) { }

  getUsersWaiting(): Observable<User[]> {
    return this.userService.getAllUsers().pipe(
      map((users: User[]) => users.filter(user => user.status === 'Pending'))
    );
  }

  acceptUser(userId: string): Observable<User> {
    const statusUpdate = { status: 'Accepted' }; // Données à envoyer pour la mise à jour du statut
    return this.http.patch<User>(`${this.apiUrl}/${userId}/accept`, statusUpdate);
  }
  
/*
  constructor(private userService: UserService) { }

  getUsersWaiting(): Observable<User[]> {
    return this.userService.getAllUsers().pipe(
      map((users: User[]) => users.filter(user => user.status === 'En attente'))
    );
  }

  acceptUser(userId: string): Observable<User> {
    return this.userService.patch<User>(`${this.apiUrl}/${userId}/accept`, {});
  }*/
}
