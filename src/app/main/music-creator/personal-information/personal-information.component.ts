import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { slideInAnimation } from '../../../shared/animation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClearObservable } from '../../../shared/components/clearObservable';
import * as $ from 'jquery';
import { StepperHelperService } from '../../../shared/services/stepper-helper.service';


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
  togglePage = true;
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
  stepper = {
    first: '#00B274',
    second: '#4D4D4D'
  };
  numberPattern = new RegExp('^[0-9]+$');
  visibleDropdown = false;

  constructor(private formBuilder: FormBuilder,
              private stepperHelperService: StepperHelperService) {
    super();

    this.initFirstStep();
  }

  ngOnInit() {
    this.initForm();
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

  toggleDropdown() {
    this.visibleDropdown = !this.visibleDropdown;
  }

  deleteItem() {
    const index = this.helperName.findIndex((item) => {
      return item.name;
    });
    this.helperName.splice(index, 1);
    }

  initFirstStep() {
    this.stepperHelperService.stepperSubject.next(this.stepper);
  }

}
