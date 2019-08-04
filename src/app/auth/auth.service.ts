import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../shared/interfaces/user";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser = {
    user: {
      firstName: 'Yura',
      middleName: 'Test',
      lastName: 'Spivak',
      email: '',
    } as User,
    token: 'dfkjjuwyefiv873w4fikefiyu3ui'
  };

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post('/register', user);
  }

  login(user: User) {
    this.loggedUser.user.email = user.email;
    return of(this.loggedUser);
  }
}
