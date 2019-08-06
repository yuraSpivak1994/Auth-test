import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 80) {
      const element = document.getElementById('navbar');
      const btn = document.getElementById('btn');
      element.classList.add('sticky');
      btn.classList.add('red-lang');
    } else {
      const element = document.getElementById('navbar');
      element.classList.remove('sticky');
      const btn = document.getElementById('btn');
      btn.classList.remove('red-lang');
    }
  }
}
