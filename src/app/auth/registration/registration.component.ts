import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../auth.service';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ClearObservable } from '../../shared/components/clearObservable';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  styles: [`
      /deep/ .mat-checkbox-frame,
      /deep/ .mat-checkbox-background {
          border-radius: 50% !important;
      }

      /deep/ .mat-checkbox-checked.mat-accent .mat-checkbox-background,
      /deep/ .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {
          margin: 5px;
          background-color: #00B274;
      }

  `],
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

export class RegistrationComponent extends ClearObservable implements OnInit {

  form: FormGroup;
  hide = true;
  errorToggle = false;
  toggleSuccess = false;
  togglePage = true;
  passwordRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
  matcher = new MyErrorStateMatcher();
  showSpinner = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(8),
        Validators.pattern(this.passwordRegex)]
      ],
      confirmPassword: ['']
      ,
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      middleName: '',
    }, {validator: this.checkPasswords});
  }

  checkLengthPassword() {
    return this.form.get('password').value.length >= 8
      && this.form.get('password').value.length <= 16;
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  passwordHasNumber(password: string) {
    const validator = /\d/;
    return validator.test(password);
  }

  validateFirstName() {
    return this.form.get('firstName').invalid && this.form.get('firstName').touched;
  }

  validateLastName() {
    return this.form.get('lastName').invalid && this.form.get('lastName').touched;
  }

  passwordHasLetter(password: string) {
    const validator = /[A-Z]/;
    return validator.test(password);
  }

  passwordHasSpecialSymbol(password: string) {
    return this.passwordRegex.test(password);
  }

  hideError() {
    this.togglePage = true;
    this.errorToggle = false;
  }

  onSubmit() {
    if (this.form.valid) {
      this.showSpinner = true;
      const req: User = {};

      req.firstName = this.form.controls.firstName.value;
      req.middleName = this.form.controls.middleName.value;
      req.lastName = this.form.controls.lastName.value;
      req.username = this.form.controls.email.value;
      req.password = this.form.controls.password.value;
      req.hearAbout = 4;
      req.passwordRepeat = this.form.controls.confirmPassword.value;

      this.authService.register(req)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
            this.showSpinner = false;
            this.toggleSuccess = true;
            this.togglePage = false;
          },
          (err: HttpErrorResponse) => {
            this.errorToggle = true;
            this.togglePage = false;
            this.showSpinner = false;
            console.log(err);
          });
    }
  }
}
