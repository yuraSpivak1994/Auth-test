import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { StepperHelperService } from '../shared/services/stepper-helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private hide = false;
  isLogged: boolean;

  constructor(private userService: UserService,
              private router: Router,
              private stepperService: StepperHelperService) {
  }

  ngOnInit() {
    console.log(this.isLogged = this.userService.getToken());
    this.showButtonLogout();
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


  showButtonLogout() {
    this.stepperService.checkBtnLogout
      .subscribe((res: boolean) => {
        if (res) {
          this.isLogged = res;
        }
      });
  }

  hideLogoutBtn() {
    this.stepperService.checkBtnLogout.next(false);
  }

  logout() {
    localStorage.clear();
    this.hide = false;
    this.isLogged = false;
    this.hideLogoutBtn();
    this.stepperService.checkBtnLogout.next(false);
    this.router.navigate(['']);
  }
}

