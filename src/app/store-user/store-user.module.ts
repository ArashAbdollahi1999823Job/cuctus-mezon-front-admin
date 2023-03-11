import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreUserRoutingModule } from './store-user-routing.module';
import {StoreUserComponent} from "./store-user-c/store-user.component";
import {StoreUserNavComponent} from "./store-user-nav/store-user-nav.component";
import {StoreUserEditComponent} from "./store-user-Edit/store-user-edit.component";
import {StoreUserPictureComponent} from "./store-user-picture/store-user-picture-c/store-user-picture.component";
import {
  StoreUserPictureNavComponent
} from "./store-user-picture/store-user-picture-nav/store-user-picture-nav.component";
import { StoreUserPictureMainComponent } from './store-user-picture/store-user-picture-main/store-user-picture-main-c/store-user-picture-main.component';
import { StoreUserPictureAddComponent } from './store-user-picture/store-user-picture-add/store-user-picture-add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {
  StoreUserPictureEditComponent
} from "./store-user-picture/store-user-picture-main/store-user-picture-edit/store-user-picture-edit.component";
@NgModule({
  declarations: [
    StoreUserNavComponent,
    StoreUserPictureEditComponent,
    StoreUserComponent,
    StoreUserEditComponent,
    StoreUserPictureComponent,
    StoreUserPictureNavComponent,
    StoreUserPictureMainComponent,
    StoreUserPictureAddComponent
  ],
  imports: [
    CommonModule,
    StoreUserRoutingModule,
    ReactiveFormsModule
  ]
})
export class StoreUserModule { }
