import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './user-c/user.component';
import { UserMainComponent } from './user-main/user-main-c/user-main.component';
import { UserFilterComponent } from './user-main/user-filter/user-filter.component';
import { UserResultComponent } from './user-main/user-result/user-result.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-main/user-edit/user-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UserPaginationComponent} from "./user-main/user-pagination/user-pagination.component";
import {SharedModule} from "../shared/shared.module";
import {UserNavComponent} from "./user-nav/user-nav.component";


@NgModule({
  declarations: [
    UsersComponent,
    UserNavComponent,
    UserMainComponent,
    UserFilterComponent,
    UserResultComponent,
    UserAddComponent,
    UserEditComponent,
    UserPaginationComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserModule { }
