import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../message.service';
import {Message} from '../message';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../user/user';

@Component({
  selector: 'app-message-get',
  templateUrl: './message-get.component.html',
  styleUrls: ['./message-get.component.css'],
  providers: [MessageService]
})
export class MessageGetComponent implements OnInit {
  messages: Message[];
  mainMessageId: number;
  isLiked: boolean;
  isReblogged: boolean;
  messageForm: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('sessionUser'));

    this.route.params.subscribe(params => {
      this.mainMessageId = +params['idOfMessage'];
      this.getMessages(this.mainMessageId);
    });

    this.messageForm = new FormGroup({
      answerToMessage: new FormControl('', Validators.required),
    });

  }

  onSubmit() {
    if (this.messageForm.valid) {
      const messageText = this.messageForm.controls['answerToMessage'].value;
      const message: Message = new Message(JSON.parse(localStorage.getItem('sessionUser')), messageText);
      this.postMessage(message, this.mainMessageId);
    }
  }

  showMessage(message: Message) {
    this.router.navigate(['/message', message.id]);
  }

  like(message: Message) {
    if (this.isLiked) {
      message.countOfLikes--;

      this.messageService.dislikeMessage(message.id, this.user.id).subscribe(
        response => {
        }, error => {
          console.log(error);
        });
    } else {
      message.countOfLikes++;

      this.messageService.likeMessage(message.id, this.user.id).subscribe(
        Response => {
        }, error => {
          console.log(error);
        });
    }

    this.isLiked = !this.isLiked;
  }

  reblog(message: Message) {
    if (this.isReblogged) {
      message.countOfReblogs--;

      this.messageService.removeReblog(message.id, this.user.id).subscribe(
        Response => {
        }, error => {
          console.log(error);
        });
    } else {
      message.countOfReblogs++;

      this.messageService.reblog(message.id, this.user.id).subscribe(
        Response => {
        }, error => {
          console.log(error);
        });
    }

    this.isReblogged = !this.isReblogged;
  }

  private getMessages(id: number) {
    this.messageService.getMessage(id).subscribe(
      messages => {
        this.messages = messages;
        this.setCountOfLikesAndReblogsForMainMessage(messages);
        this.getLikeStatus(this.mainMessageId);
        this.getReblogStatus(this.mainMessageId);
      },
      error => {
        console.log(error);
      });
  }

  private setCountOfLikesAndReblogsForMainMessage(messages: Message[]) {
    const msg = this.messages.filter(m => m.id === this.mainMessageId)[0];
    this.getCountOfLikes(this.mainMessageId, msg);
    this.getCountOfReblogs(this.mainMessageId, msg);
  }

  private postMessage(message: Message, id: number) {
    this.messageForm.reset();
    this.messageService.answerMessage(message, id).subscribe(
      msg => {
        this.router.navigate(['/message', msg.id]);
      }, error => {
        console.log(error);
      });
  }

  private getCountOfLikes(id: Number, message: Message) {
    this.messageService.getCountOfLikes(id).subscribe(
      countOfLikes => {
        message.countOfLikes = +countOfLikes;
      }, error => {
        console.log(error);
      });
  }

  private getCountOfReblogs(id: Number, message: Message) {
    this.messageService.getCountOfReblogs(id).subscribe(
      countOfReblogs => {
        message.countOfReblogs = +countOfReblogs;
      }, error => {
        console.log(error);
      });
  }

  private getLikeStatus(mainMessageId: number) {
    this.messageService.isLiked(mainMessageId, this.user.id).subscribe(
      isLiked => {
        this.isLiked = isLiked;
      }, error => {
        console.log(error);
      });
  }

  private getReblogStatus(mainMessageId: number) {
    this.messageService.isReblogged(mainMessageId, this.user.id).subscribe(
      isReblogged => {
        this.isReblogged = isReblogged;
      }, error => {
        console.log(error);
      });
  }
}
