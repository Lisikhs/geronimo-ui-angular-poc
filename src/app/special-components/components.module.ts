import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCardComponent} from './user-card/user-card.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {GeronimoNavbarComponent} from './geronimo-navbar/geronimo-navbar.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [UserCardComponent, SideBarComponent, GeronimoNavbarComponent],
  exports: [UserCardComponent, SideBarComponent, GeronimoNavbarComponent]
})
export class ComponentsModule {
}
