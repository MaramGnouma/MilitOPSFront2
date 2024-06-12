import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/agents';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  acceptUser(userId: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}/accept`, {});
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

}
