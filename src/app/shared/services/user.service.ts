import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(data) {
    const token: string = data;
    localStorage.setItem('token', JSON.stringify(token));
  }


  getToken() {
    if (localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'));
    } else {
      return null;
    }
  }

}
