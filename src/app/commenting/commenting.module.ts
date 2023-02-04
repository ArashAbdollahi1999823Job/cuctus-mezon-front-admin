import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentingRoutingModule } from './commenting-routing.module';
import { CommentingComponent } from './commenting-c/commenting.component';


@NgModule({
  declarations: [
    CommentingComponent
  ],
  imports: [
    CommonModule,
    CommentingRoutingModule
  ]
})
export class CommentingModule { }
