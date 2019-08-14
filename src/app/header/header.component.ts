import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { MainService } from '../main/main.service';
import { User } from '../shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private hide = false;
  isLogged: boolean;
  test: boolean;
  // tslint:disable-next-line:ban-types
  public userInfo = {
    user: {
        firstName: '',
        lastName: ''
    }
  };
  userInitial = {
    firstName: '',
    lastName: ''
  };

  constructor(private userService: UserService,
              private router: Router,
              private mainService: MainService) {
  }

  ngOnInit() {
    this.checkIsBtn();
    this.getUserData();
  }

  cutInitials(firstName, lastName) {
    this.userInitial.firstName =  firstName.substr(0, 1);
    this.userInitial.lastName = lastName.substr(0, 1);
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
      element.classList.add('sticky');
    } else {
      const element = document.getElementById('navbar');
      element.classList.remove('sticky');
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

  getUserData() {
    this.mainService.getUser()
      .subscribe((res: any) => {
        this.userInfo = res;
        this.cutInitials(this.userInfo.user.firstName, this.userInfo.user.lastName);
      });
  }
}

