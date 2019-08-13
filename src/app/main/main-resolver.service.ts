import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../shared/models';
import { Observable } from 'rxjs';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class MainResolverService implements Resolve<User> {

  constructor(private mainService: MainService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<User> | Promise<User> | User {

    // @ts-ignore
    return this.mainService.getUser();
  }
}
