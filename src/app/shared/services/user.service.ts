import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(data) {
    const user: User = data.user;
    const token: string = data;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
  }

  getUser() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return null;
    }
  }

  getToken() {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'));
    } else {
      return null;
    }
  }

  testIntercepror() {
    return this.http.get('test');
  }
}
