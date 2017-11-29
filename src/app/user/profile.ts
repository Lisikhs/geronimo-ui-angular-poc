export class Profile {
  status: string;
  picture: Blob;
  dateOfBirth: Date;

  constructor(status: string, dateOfBirth: Date, picture: Blob) {
    this.status = status;
    this.dateOfBirth = dateOfBirth;
    this.picture = picture;
  }
}
