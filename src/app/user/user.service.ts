import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Message} from '../message/message';

@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: Http) {
  }

  findAll(): Observable<User[]> {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json());
  }

  findById(id: number): Observable<User> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res: Response) => res.json());
  }

  getFeedByUserId(id: number): Observable<Message[]> {
    return this.http.get(this.apiUrl + '/' + id + '/feed')
      .map((res: Response) => res.json());
  }

  saveUser(user: User): Observable<Boolean> {
    return this.http.post(this.apiUrl, user)
      .map((res: Response) => res.json());
  }

  deleteUserById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
      .map((res: Response) => res.json());
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(this.apiUrl, user)
      .map((res: Response) => res.json());
  }

  validateUser(user: User): Observable<User> {
    return this.http.post(this.apiUrl + '/validate', user)
      .map((res: Response) => res.json());
  }

  getMessagesOfUser(id: number): Observable<Message[]> {
    return this.http.get(this.apiUrl + '/' + id + '/messages')
      .map((res: Response) => res.json());
  }

  isSubscribedTo(idOfSessionUser: number, idOfUser: number): Observable<boolean> {
    return this.http.get(this.apiUrl + '/is/' + idOfSessionUser + '/subscribedTo/' + idOfUser)
      .map((res: Response) => res.json());
  }

  subscribeTo(idOfSessionUser: number, idOfUser: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + idOfSessionUser + '/subscribeTo/' + idOfUser);
  }

  unsubscribeFrom(idOfSessionUser: number, idOfUser: number): Observable<any> {
    return this.http.get(this.apiUrl + '/' + idOfSessionUser + '/unsubscribeFrom/' + idOfUser);
  }

  getUserInfo(id: number): Observable<number[]> {
    return this.http.get(this.apiUrl + '/getUserInfo/' + id)
      .map((res: Response) => res.json());
  }
}
