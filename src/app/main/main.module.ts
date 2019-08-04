import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { RouterModule } from "@angular/router";
import { MainRoutingModule } from "./main-routing.module";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [ MainComponent],
  providers: []
})

export class MainModule {}
