import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import { User } from '../shared/interfaces/user';
import { UserService } from '../shared/services/user.service';
import { ClearObservable } from '../shared/components/clearObservable';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends ClearObservable implements OnInit {
  user: User = {};
  constructor(private router: Router,
              private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  testInterceptor() {
    this.userService.testIntercepror()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log('testInterceptor', res);
      }, (err: HttpErrorResponse) => {
        console.log('testInterceptor', err);
      })
  }
}
