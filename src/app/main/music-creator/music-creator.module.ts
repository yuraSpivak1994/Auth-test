import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { MusicCreatorRouterModule } from './music-creator-router.module';
import { MusicCreatorComponent } from './music-creator.component';
import { UploadContractsComponent } from './upload-contracts/upload-contracts.component';
import { SharedModule } from '../../shared/shared.module';
import {
  MatCheckboxModule, MatChipsModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [MusicCreatorComponent, PersonalInformationComponent, UploadContractsComponent],
  exports: [],
  imports: [
    CommonModule,
    MusicCreatorRouterModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule
  ]
})
export class MusicCreatorModule { }
