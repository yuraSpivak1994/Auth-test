import { Component, HostListener, OnInit } from '@angular/core';
import { slideInAnimation } from '../../shared/animation';
import { StepperHelperService } from '../../shared/services/stepper-helper.service';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MainService } from '../main.service';
import { User } from '../../shared/models';

@Component({
  selector: 'app-music-creator',
  templateUrl: './music-creator.component.html',
  styleUrls: ['./music-creator.component.scss'],
  animations: [ slideInAnimation ]
})
export class MusicCreatorComponent implements OnInit {
  firstStep = 1;
  secondStep = 0;
  stepper = {
    first: '#00B274',
    second: ''
  };
  form: FormGroup;
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
  // tslint:disable-next-line:ban-types
  public userInfo = {
    user: {
      applicant: {
        address: [{city: '', country: '', postalCode: '', provinceState: '', addressLine1: ''}],
        applicationStep: '',
        applicationType: '',
        creatorData: {DOB: '', gender: '', genderValue: ''},
        name: [{name: ''}, {name: ''}],
        phone: [{phoneNumber: ''}],
        submitter: ''
      }
    }
  };

  numberPattern = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$');
  visibleDropdown = false;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  pathInput: string;
  togglePagePersonal = true;
  toggleUploader = false;
  genderValue =  false;
  showSpinner = false;
  alertMessageSuccess = false;
  alertMessageError = false;

  constructor(private stepperHelperService: StepperHelperService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private mainService: MainService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.activatedRoute.data.subscribe((data: any) => {
      this.userInfo = data;
      this.showSpinner = false;
    }, error => {
      this.showSpinner = false;
    });

  }

  checkGenderValue(value) {
    if (value === 'O') {
      this.genderValue = true;
    } else {
      this.genderValue = false;
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      preferredName: new FormControl(null, [Validators.required]),
      pseudonym: new FormControl(null, [Validators.required]),
      selectGender: new FormControl(null, [Validators.required]),
      otherGender: new FormControl(null, [Validators.required]),
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

  checkStep() {
    if (this.toggleUploader) {
        this.stepper.second = '#00B274';
    } else  {
      this.stepper.second = '#4D4D4D';
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

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }


  onSubmitUploader() {
    const formData = new FormData();
    formData.append('files', this.fileData);
    this.fileUploadProgress = '0%';

    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
          console.log(this.fileUploadProgress);
        } else if (events.type === HttpEventType.Response) {
          console.log(events.body);
        }
      });
  }

  removeContract() {
    this.fileData = null;
    this.pathInput = '';
    this.fileUploadProgress = '0';
  }

  save() {
    this.onSubmitApplication();
  //   if (this.togglePagePersonal) {
  //     this.togglePagePersonal = false;
  //     this.toggleUploader = true;
  //     this.firstStep = 1;
  //     this.secondStep = 2;
  //     this.checkStep();
  // } else {
  //     this.togglePagePersonal = true;
  //     this.toggleUploader = false;
  //     this.secondStep = 0;
  //     this.checkStep();
  //   }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 80) {
      const btn = document.getElementById('btn2');
      btn.classList.add('red-lang');
    } else {
      const btn = document.getElementById('btn2');
      btn.classList.remove('red-lang');
    }
  }

  getUserData() {
    this.mainService.getUser()
      .subscribe((res) => {
        console.log(res);
      });
  }


  onSubmitApplication() {
    this.showSpinner = true;
    const application: any = {};
    application.applicationType = 'Creator';
    application.applicationStep = '1';
    application.name = [{
      isPreferredName: true,
      nameType: 'preferred',
      name: this.form.controls.preferredName.value
    }, {
      nameType: 'pseudonym',
      name: this.form.controls.pseudonym.value
    }
    ];
    application.phone =  [{phoneNumber: this.form.controls.phone.value}];
    application.creatorData = {
      gender: this.form.controls.selectGender.value,
      DOB: this.form.controls.date.value,
      genderValue: this.form.controls.otherGender.value
    };
    application.address = [
      {
        country: this.form.controls.country.value,
        provinceState: this.form.controls.state.value,
        addressLine1: this.form.controls.address.value,
        city: this.form.controls.city.value,
        postalCode: this.form.controls.postal.value
      }
    ];
    console.log(application);
    this.mainService.createApp({application : application})
      .subscribe((res) => {
        this.showSpinner = false;
        this.showSuccessAlert();
      },
        error => {
          this.showSpinner = false;
          this.showErrorAlert();
          console.log(error);
        });
  }

  showSuccessAlert() {
    this.alertMessageSuccess = true;
    setTimeout(() => {
      this.alertMessageSuccess = false;
    }, 3000);
  }

  showErrorAlert() {
    this.alertMessageError = true;
    setTimeout(() => {
      this.alertMessageError = false;
    }, 3000);
  }
}
