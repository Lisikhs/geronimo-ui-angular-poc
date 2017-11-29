import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-geronimo-navbar',
  templateUrl: './geronimo-navbar.component.html',
  styleUrls: ['./geronimo-navbar.component.css']
})
export class GeronimoNavbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  homePage(): void {
    this.router.navigate(['/home']);
  }

  logOut(): void {
    localStorage.removeItem('sessionUser');
    this.router.navigate(['/user/login']);
  }

}
