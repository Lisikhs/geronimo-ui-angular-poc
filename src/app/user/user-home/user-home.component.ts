import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {User} from '../user';
import {isNullOrUndefined} from 'util';
import {Message} from '../../message/message';
import {MessageService} from '../../message/message.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CheckAuthentication} from '../../helpers/auth-outlet/auth-outlet';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [UserService, MessageService]
})
export class UserHomeComponent implements OnInit {
  user: User;
  feed: Message[];
  messageForm: FormGroup;

  constructor(private router: Router,
              private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    CheckAuthentication.activate(this.router);

    this.user = JSON.parse(localStorage.getItem('sessionUser'));
    this.userService.getFeedByUserId(this.user.id).subscribe(
      messages => {
        this.feed = messages;
      }, error => {
        console.log(error);
      });

    this.messageForm = new FormGroup({
      message: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  postMessage() {
    if (this.messageForm.valid) {
      const message: Message = new Message(this.user, this.messageForm.controls['message'].value);
      this.messageService.postMessage(message).subscribe();
    }

    this.refreshPage();
  }

  showMessage(message: Message) {
    this.router.navigate(['/message', message.id]);
  }

  refreshPage() {
    location.reload();
  }
}
