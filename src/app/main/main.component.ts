import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClearObservable } from '../shared/components/clearObservable';

@Component({
  selector: 'app-auth',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends ClearObservable implements OnInit {


  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
