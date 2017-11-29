import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {CheckAuthentication} from './helpers/auth-outlet/auth-outlet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    CheckAuthentication.activate(this.router);
  }
}
