import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageGetComponent} from './message-get/message-get.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageRoutingModule} from './message-routing.module';
import {ComponentsModule} from '../special-components/components.module';

@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule],
  declarations: [MessageGetComponent]
})
export class MessageModule {
}
