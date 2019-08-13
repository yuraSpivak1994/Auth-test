import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private hide = false;
  isLogged: boolean;
  test: boolean;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.checkIsBtn();
  }

  checkIsBtn() {
    setInterval(() => {
      this.isLogged = this.userService.getToken();
    }, 200);
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


  toggleButton() {
    this.hide = !this.hide;
  }


  logout() {
    localStorage.clear();
    this.hide = false;
    this.isLogged = false;
    this.router.navigate(['']);
  }
}

