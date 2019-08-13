import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperHelperService {
  stepperSubject = new BehaviorSubject(null);
  constructor() {
  }
}
