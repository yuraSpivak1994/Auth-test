import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperHelperService {
  stepperSubject = new BehaviorSubject(null);
  checkBtnLogout = new BehaviorSubject(null);
  constructor() {
  }
}
