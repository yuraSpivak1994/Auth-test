import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../../shared/animation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/interfaces/user';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ClearObservable } from '../../../shared/components/clearObservable';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
  animations: [ slideInAnimation ],
  styles: ['/deep/.mat-checkbox-checked.mat-accent .mat-checkbox-background,' +
  ' .mat-checkbox-indeterminate.mat-accent .mat-checkbox-background {\n' +
  '    background-color: #00B274;\n' +
  '}']
})
export class PersonalInformationComponent extends ClearObservable implements OnInit {

  form: FormGroup;
  hide = true;
  errorToggle = false;
  toggleSuccess = false;
  togglePage = true;
  passwordRegex = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
  showSpinner = false;
  startDate = new Date();

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

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  validateFirstName() {
    return this.form.get('firstName').invalid && this.form.get('firstName').touched;
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
