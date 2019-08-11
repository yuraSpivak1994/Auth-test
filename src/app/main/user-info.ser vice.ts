import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private url = 'http://demo.ckan.org/api/3/action/tag_list';

  constructor(private http: HttpClient) {
  }

  getCanadaStates() {
    return this.http.get(`${this.url}`);
  }
}
