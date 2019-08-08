import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../../shared/animation';

@Component({
  selector: 'app-upload-contracts',
  templateUrl: './upload-contracts.component.html',
  styleUrls: ['./upload-contracts.component.scss'],
  animations: [ slideInAnimation ]
})
export class UploadContractsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
