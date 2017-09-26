import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {isUndefined} from 'util';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit {

  user: User;
  protected id;

  constructor(private router: ActivatedRoute,
              private routerForNavigation: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getParams();

    if (!isNaN(this.id)) {
      this.getUserById();
    } else {
      this.user = new User(0, '', '');
    }
  }

  private getParams() {
    this.router.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

  private getUserById() {
    this.userService.findById(this.id).subscribe(
      user => {
        this.user = user;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    if (isNaN(this.id)) {
      this.save();
    } else {
      this.update();
    }
    this.routerForNavigation.navigate(['/user']);
  }

  private save() {
    this.userService.saveUser(this.user).subscribe();
  }

  private update() {
    this.userService.updateUser(this.user).subscribe();
  }


}
