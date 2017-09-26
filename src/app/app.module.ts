import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserModule} from './user/user.module';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {UserCreateComponent} from './user/user-create/user-create.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
