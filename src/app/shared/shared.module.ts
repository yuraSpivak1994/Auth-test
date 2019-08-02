import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  exports: [ReactiveFormsModule, FormsModule],
  declarations: []
})
export class SharedModule {}
