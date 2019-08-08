import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../shared/animation';

@Component({
  selector: 'app-select-application',
  templateUrl: './select-application.component.html',
  styleUrls: ['./select-application.component.scss'],
  animations: [slideInAnimation]
})
export class SelectApplicationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
