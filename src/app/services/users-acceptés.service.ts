import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importez l'opérateur map depuis rxjs/operators

@Injectable({
  providedIn: 'root'
})
export class UsersAcceptésService {



  constructor(private userService: UserService) { }

  getUsersAccepté(): Observable<User[]> {
    return this.userService.getAllUsers().pipe(
      map((users: User[]) => users.filter(user => user.status === 'Accepted'))
    );
  }


}
