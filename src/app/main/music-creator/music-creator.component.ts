import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../shared/animation';
import { StepperHelperService } from '../../shared/services/stepper-helper.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music-creator',
  templateUrl: './music-creator.component.html',
  styleUrls: ['./music-creator.component.scss'],
  animations: [ slideInAnimation ]
})
export class MusicCreatorComponent implements OnInit {
  stepper = {
    first: '',
    second: ''
  };

  constructor(private stepperHelperService: StepperHelperService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getFirstStep();
  }

  checkColor(color) {
    if (color === undefined || color === '') {
      return 'inherit';
    } else {
      return 'initial';
    }
  }
  getFirstStep() {
    this.stepperHelperService.stepperSubject
      .subscribe((res: object) => {
        if (res) {
          // @ts-ignore
          this.stepper.first = res.first;
          // @ts-ignore
          this.stepper.second = res.second;
        }
      });
  }
}
