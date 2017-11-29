import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserHomeComponent} from './user-home/user-home.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserPageComponent} from './user-page/user-page.component';

const routes: Routes = [
  {path: 'user/create', component: UserCreateComponent},
  {path: 'user/edit/:id', component: UserEditComponent},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'user/:id', component: UserPageComponent},
  {path: 'home', component: UserHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
