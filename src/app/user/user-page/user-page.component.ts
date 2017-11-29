import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../message/message.service';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user';
import {Message} from '../../message/message';
import {CheckAuthentication} from '../../helpers/auth-outlet/auth-outlet';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [UserService, MessageService]
})
export class UserPageComponent implements OnInit {
  userWhoOwnsPage: User;
  messages: Message[];
  id: number;
  loaded = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    CheckAuthentication.activate(this.router);

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userService.findById(this.id).subscribe(
      user => {
        this.userWhoOwnsPage = user;
      }, error => {
        console.log(error);
      });

    this.userService.getMessagesOfUser(this.id).subscribe(
      messages => {
        this.messages = messages;
        this.loaded = true;
      }, error => {
        console.log(error);
      });
  }

  showMessage(message: Message) {
    this.router.navigate(['/message', message.id]);
  }
}
