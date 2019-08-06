import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../auth.service';
import { ClearObservable } from '../../shared/components/clearObservable';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(700)
      ]),
      transition(':leave',
        animate(700, style({opacity: 0})))
    ])
  ]
})
export class LoginComponent extends ClearObservable implements OnInit {

  form: FormGroup;
  hide = true;
  showSpinner = false;

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

  private validatePassword() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  private validateEmail() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  login() {
    if (this.form.valid) {
      this.showSpinner = true;
      const req: User = {};
      req.username = this.form.controls.email.value;
      req.password = this.form.controls.password.value;

      this.authService.login(req)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.userService.saveUser(data);
          this.showSpinner = false;
          this.router.navigate(['/main']);

        }, (err: HttpErrorResponse) => {
          this.showSpinner = false;
          console.log(err);
          this.initLoginForm();
        });
    }
  }
}
