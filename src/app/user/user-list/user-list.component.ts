import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  protected users: User[];

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {  // when component loading get all users and set the users[]
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.findAll().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewUserPage() {
    this.router.navigate(['/user/create']);
  }

  editUserPage(user: User) {
    if (!isNullOrUndefined(user)) {
      this.router.navigate(['/user/edit', user.id]);
    }
  }

  deleteUser(user: User) {
    this.userService.deleteUserById(user.id).subscribe(
      flag => {
      },
      err => {
        console.log(err);
      }
    );
    window.location.reload();
  }
}
