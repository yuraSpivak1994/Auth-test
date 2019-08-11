import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { slideInAnimation } from '../../../shared/animation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/interfaces/user';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ClearObservable } from '../../../shared/components/clearObservable';
import * as $ from 'jquery';
import { UserInfoService } from '../../user-info.ser vice';


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

  @Output() onChanged = new EventEmitter<boolean>();
  form: FormGroup;
  hide = true;
  errorToggle = false;
  toggleSuccess = false;
  togglePage = true;
  showSpinner = false;
  startDate = new Date();
  states: string[] = [
    'About Winnipeg', 'Manitoba', 'Hamilton', 'Ontario', 'Quebec', 'Edmonton'
  ];
  helperName = [
      {name: 'Yura Mormon'},
      {name: 'Lera Mormon'},
      {name: 'Dima Mormon'},
      {name: 'Vasya Mormon'},
      {name: 'Petro Mormon'},
  ];
  numberPattern = new RegExp('^[0-9]+$');
  visibleDropdown = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userInfoService: UserInfoService) {
    super();
  }

  ngOnInit() {
    this.initForm();
    // this.getCanadaStates();
  }

  change(increased:any) {
    this.onChanged.emit(increased);
  }

  getCanadaStates() {
    this.userInfoService.getCanadaStates().subscribe((data) => {
      console.log(data);
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      preferredName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(this.numberPattern)]),
      date: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      postal: new FormControl(null, [Validators.required]),
      checkbox: new FormControl(null, [Validators.required, Validators.requiredTrue]),
    });
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

  toggleDropdown() {
    this.visibleDropdown = !this.visibleDropdown;
  }

  deleteItem() {
    const index = this.helperName.findIndex((item) => {
      return item.name;
    });
    this.helperName.splice(index, 1);
    }
}
