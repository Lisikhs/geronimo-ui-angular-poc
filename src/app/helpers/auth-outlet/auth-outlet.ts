import {Router, RouterOutlet} from '@angular/router';
import {isNullOrUndefined} from 'util';

export class CheckAuthentication {

  static activate(router: Router) {
    if (!CheckAuthentication.isAuthenticated()) {
      router.navigate(['/user/login']);
    }
  }

  private static isAuthenticated(): boolean {
    return !isNullOrUndefined(localStorage.getItem('sessionUser'));
  }
}
