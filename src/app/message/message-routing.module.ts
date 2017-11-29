import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MessageGetComponent} from './message-get/message-get.component';

const routes: Routes = [
  {path: 'message/:idOfMessage', component: MessageGetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
