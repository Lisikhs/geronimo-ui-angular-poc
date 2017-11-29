import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {isNullOrUndefined, isUndefined} from 'util';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../profile';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit {
  title: String = 'Create user';

  userForm: FormGroup;
  validationMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    // if logged user visits /create url, he needs to be notified that he first needs to log out, right?
    if (!isNullOrUndefined(localStorage.getItem('sessionUser'))) {
      this.router.navigate(['/home']);
    }

    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required,  Validators.minLength(3), Validators.maxLength(15)])
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = new User(null,
        this.userForm.controls['username'].value,
        this.userForm.controls['password'].value,
        new Profile(null, null, null));
      this.save(user);
    }
  }

  redirectToLoginPage() {
    const status = true;
    this.router.navigate(['/user/login'], { queryParams: { registered: true } });
  }

  private save(user: User) {
    this.userService.saveUser(user).subscribe(
      res => {
        if (res === true) {
          this.redirectToLoginPage();
        } else {
          this.validationMessage = 'Username has already been taken';
        }
      }
    );
  }

  private update(user: User) {
    this.userService.updateUser(user).subscribe();
  }
}
