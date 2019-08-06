import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../shared/interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://devsocmemapi.socmemdevelopment.com/api/v0';

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${this.url}/auth-ms/createUser`, user);
  }

  login(user: User) {
    return this.http.post(`${this.url}/auth-ms/sign-in`, user);
  }

}
