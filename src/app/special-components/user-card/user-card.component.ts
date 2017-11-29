import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../user/user';
import {isNullOrUndefined} from 'util';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  providers: [UserService]
})

export class UserCardComponent implements OnInit, OnChanges {
  isSubscribed = false;
  isSessionUser = true;
  @Input() _user: User = JSON.parse(localStorage.getItem('sessionUser'));
  sessionUser: User = this._user;
  countOfPosts: number;
  countOfFollowed: number;
  countOfFollowers: number;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (!isNullOrUndefined(this._user)) {
      this.getUserInfo();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['_user'].isFirstChange()) {
      this.isSessionUser = false;

      console.log(this._user);
      // this.sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
      this.userService.isSubscribedTo(this.sessionUser.id, this._user.id).subscribe(
        isSubscribed => {
          this.isSubscribed = isSubscribed;
        },
        error => {
          console.log(error);
        }
      );
      this.getUserInfo();
    }
  }

  getUserInfo() {
    this.userService.getUserInfo(this._user.id).subscribe(
      info => {
        this.countOfPosts = info[0];
        this.countOfFollowed = info[1];
        this.countOfFollowers = info[2];
      },
      error => {
        console.log(error);
      });
  }

  unsubscribe() {
    this.isSubscribed = !this.isSubscribed;
    this.userService.unsubscribeFrom(this.sessionUser.id, this._user.id).subscribe();
  }

  subscribe() {
    this.isSubscribed = !this.isSubscribed;
    this.userService.subscribeTo(this.sessionUser.id, this._user.id).subscribe();
  }
}
