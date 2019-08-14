import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface User {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  password?: string;
  passwordRepeat?: string;
  lang?: string;
  hearAbout?: number;
}

export interface Application {
  applicationType?: string;
  applicationStep?: string;
  name?: Array<any>;
  phone?: Array<any>;
  creatorData?: object;
  address?: Array<any>;
}

