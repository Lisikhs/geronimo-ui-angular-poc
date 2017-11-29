import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {UserModule} from './user/user.module';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {MessageModule} from './message/message.module';
import {ComponentsModule} from './special-components/components.module';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    MessageModule,
    HttpModule,
    FormsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
