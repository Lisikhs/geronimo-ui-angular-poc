import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {Profile} from '../profile';
import {CheckAuthentication} from '../../helpers/auth-outlet/auth-outlet';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  id: number;
  userForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    CheckAuthentication.activate(this.router);

    this.userForm = new FormGroup({
      username: new FormControl('', null),
      password: new FormControl('', null),
      status: new FormControl('', null),
      dateOfBirth: new FormControl('', null),
      picture: new FormControl('', null)
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    const user = JSON.parse(localStorage.getItem('sessionUser'));
    this.userForm.patchValue({
      username: user.username,
      password: user.password,
      status: user.profile.status,
      dateOfBirth: user.profile.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().substring(0, 10) : user.profile.dateOfBirth,
      picture: user.profile.picture
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = new User(this.id,
        this.userForm.controls['username'].value,
        this.userForm.controls['password'].value,
        new Profile(this.userForm.controls['status'].value,
        this.userForm.controls['dateOfBirth'].value,
        this.userForm.controls['picture'].value));
      this.update(user);
    }
    this.userForm.reset();
    this.redirectUserPage();
  }

  redirectUserPage() {
    this.router.navigate(['/home']);
  }

  private update(user: User) {
    this.userService.updateUser(user).subscribe();
    localStorage.setItem('sessionUser', JSON.stringify(user));

  }
}
