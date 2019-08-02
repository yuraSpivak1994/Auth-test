import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router
  ){}
  ngOnInit(): void {}
}
