import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../../shared/animation';

@Component({
  selector: 'app-music-creator',
  templateUrl: './music-creator.component.html',
  styleUrls: ['./music-creator.component.scss'],
  animations: [ slideInAnimation ]
})
export class MusicCreatorComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
