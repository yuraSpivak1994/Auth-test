import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { fadeAnimation } from "../shared/animation";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeAnimation]
})
export class AuthComponent implements OnInit {
  constructor(
    private router: Router
  ){}
  ngOnInit(): void {
    console.log(33);
  }
}
