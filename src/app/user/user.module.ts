import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {ComponentsModule} from '../special-components/components.module';
import { UserPageComponent } from './user-page/user-page.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [
    UserCreateComponent,
    UserLoginComponent,
    UserHomeComponent,
    UserEditComponent,
    UserPageComponent]
})
export class UserModule {
}
