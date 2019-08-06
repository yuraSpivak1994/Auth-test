import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
