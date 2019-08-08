import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { MusicCreatorComponent } from './music-creator.component';
import { UploadContractsComponent } from './upload-contracts/upload-contracts.component';

const routes: Routes = [
  {path: 'creator', component: MusicCreatorComponent, children: [
      {path: 'personal', component: PersonalInformationComponent},
      {path: 'uploader', component: UploadContractsComponent}
      ]
  }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicCreatorRouterModule {}
