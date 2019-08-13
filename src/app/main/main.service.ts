import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url = 'https://devsocmemapi.socmemdevelopment.com/api/v0';

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${this.url}/onboarding-ms/getSelfApplicationData`);
  }
}
