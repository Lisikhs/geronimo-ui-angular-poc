import {User} from '../user/user';

export class Message {
  id: number;
  author: User;
  text: string;
  likes: User[];
  countOfLikes: number;
  countOfReblogs: number;
  datePosted: Date;

  constructor(author: User, text: string) {
    this.author = author;
    this.text = text;
  }
}
