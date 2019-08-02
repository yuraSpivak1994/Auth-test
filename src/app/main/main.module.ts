import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MainComponent } from "./main.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [ MainComponent],
  providers: []
})

export class MainModule {}
