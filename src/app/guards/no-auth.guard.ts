import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { UserService } from '../shared/services/user.service';


@Injectable({providedIn: 'root'})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token: string = this.userService.getToken();

    if (token) {
      this.router.navigate(['/main']);
      return false;
    } else {
      return true;
    }
  }
}
