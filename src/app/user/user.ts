import {Profile} from './profile';

export class User {
  id: number;
  username: string;
  password: string;
  profile: Profile;

  constructor(id: number, username: string, password: string, profile: Profile) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.profile = profile;
  }
}
