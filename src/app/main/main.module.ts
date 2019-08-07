import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SelectApplicationComponent } from './select-aplication/select-application.component';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  declarations: [MainComponent, SelectApplicationComponent],
  providers: []
})

export class MainModule {
}
