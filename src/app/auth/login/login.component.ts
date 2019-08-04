import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../auth.service';
import { ClearObservable } from '../../shared/components/clearObservable';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ClearObservable implements OnInit {

  form: FormGroup;
  hide = true;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl(null, [Validators.required])
    });
  }
  login() {
    const req: User = {};
    req.email = this.form.controls.email.value;
    req.password = this.form.controls.password.value;

    this.authService.login(req)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.userService.saveUser(data);
        this.router.navigate(['/main'])

      }, (err: HttpErrorResponse) => console.log(err));
  }

}
