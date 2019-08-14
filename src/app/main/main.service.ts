import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${environment.apiUrl}/onboarding-ms/getSelfApplicationData`);
  }

  createApp(userInfo) {
    return this.http.post(`${environment.apiUrl}/onboarding-ms/saveApplicationProgress`, userInfo);
}
}
