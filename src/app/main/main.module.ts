import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SelectApplicationComponent } from './select-aplication/select-application.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { MusicCreatorModule } from './music-creator/music-creator.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    MusicCreatorModule
  ],
  declarations: [MainComponent, SelectApplicationComponent],
  providers: []
})

export class MainModule {
}
