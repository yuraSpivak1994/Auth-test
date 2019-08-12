import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperHelperService } from './services/stepper-helper.service';

@NgModule({
  imports: [],
  providers: [StepperHelperService],
  exports: [ReactiveFormsModule, FormsModule],
  declarations: []
})
export class SharedModule {}
