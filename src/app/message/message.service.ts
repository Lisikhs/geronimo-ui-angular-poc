import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Message} from './message';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MessageService {

  private apiUrl = 'http://localhost:8080/message';

  constructor(private http: Http) {
  }

  getMessage(id: number): Observable<Message[]> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res: Response) => res.json());
  }

  answerMessage(message: Message, id: number): Observable<Message> {
    return this.http.post(this.apiUrl + '/' + id, message)
      .map ((res: Response) => res.json());
  }

  postMessage(message: Message): Observable<any> {
    return this.http.post(this.apiUrl, message);
  }

  likeMessage(idOfMessage: Number, idOfUser: Number): Observable<any> {
    return this.http.post(this.apiUrl + '/' + idOfMessage + '/like', idOfUser);
  }

  dislikeMessage(idOfMessage: Number, idOfUser: number): Observable<any> {
    return this.http.post(this.apiUrl + '/' + idOfMessage + '/dislike', idOfUser);
  }

  getCountOfLikes(id: Number): Observable<Number> {
    return this.http.get(this.apiUrl + '/' + id + '/getCountOfLikes')
      .map((res: Response) => res.json());
  }

  getCountOfReblogs(id: Number): Observable<Response> {
    return this.http.get(this.apiUrl + '/' + id + '/getCountOfReblogs')
      .map((res: Response) => res.json());
  }

  isLiked(idOfMessage: Number, idOfUser: Number): Observable<boolean> {
    return this.http.get(this.apiUrl + '/' + idOfMessage + '/isLikedBy/' + idOfUser)
      .map((res: Response) => res.json());
  }

  isReblogged(idOfMessage: Number, idOfUser: Number): Observable<boolean> {
    return this.http.get(this.apiUrl + '/' + idOfMessage + '/isRebloggedBy/' + idOfUser)
      .map((res: Response) => res.json());
  }

  reblog(idOfMessage: Number, idOfUser: Number): Observable<any> {
    return this.http.post(this.apiUrl + '/' + idOfMessage + '/reblog', idOfUser);
  }

  removeReblog(idOfMessage: Number, idOfUser: Number): Observable<any> {
    return this.http.post(this.apiUrl + '/' + idOfMessage + '/removeReblog', idOfUser);
  }
}
