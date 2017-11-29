import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {isNullOrUndefined, isUndefined} from 'util';
import {CheckAuthentication} from '../../helpers/auth-outlet/auth-outlet';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [UserService]
})
export class UserLoginComponent implements OnInit {

  user: User = new User(null, null, null, null);
  loading = false;
  alertMessage: string;
  registrationMessage: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    if (!isNullOrUndefined(localStorage.getItem('sessionUser'))) {
      console.log('hi');
      this.router.navigate(['/home']);
    }

    this.route.queryParams.subscribe(params => {
      const status = params['registered'];
      if (!isUndefined(status)) {
        this.registrationMessage = '<span>You\'ve successfully been registered.<br>Sign in and show the world what you\'ve got!</span>';
      }
    });
  }

  redirectHomePage() {
    this.router.navigate(['/home']);
  }

  login() {
    this.loading = true;
    this.validate();
  }

  validate() {
    this.userService.validateUser(this.user)
      .subscribe(
        res => {
          if (!isNullOrUndefined(res)) {
            this.user = res;
            localStorage.setItem('sessionUser', JSON.stringify(res));
            this.redirectHomePage();
          } else {
            this.alertMessage = 'Username or password is incorrect!';
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
          this.alertMessage = 'Username or password is incorrect!';
          console.log(error);
        });
  }
}
