import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreUserComponent} from "./store-user-c/store-user.component";
import {StoreUserEditComponent} from "./store-user-Edit/store-user-edit.component";
import {StoreUserPictureComponent} from "./store-user-picture/store-user-picture-c/store-user-picture.component";
import * as path from "path";
import {
  StoreUserPictureMainComponent
} from "./store-user-picture/store-user-picture-main/store-user-picture-main-c/store-user-picture-main.component";
import {
  StoreUserPictureAddComponent
} from "./store-user-picture/store-user-picture-add/store-user-picture-add.component";
import {
  StoreUserPictureEditComponent
} from "./store-user-picture/store-user-picture-main/store-user-picture-edit/store-user-picture-edit.component";

const routes: Routes = [
  {
    path: '', component: StoreUserComponent, children: [
      {
        path: 'StoreUserPicture', component: StoreUserPictureComponent, children: [
          {path:'StoreUserPictureMain',component:StoreUserPictureMainComponent},
          {path:'StoreUserPictureAdd',component:StoreUserPictureAddComponent},
          {path:'StoreUserPictureEdit/:StoreUserPictureId',component:StoreUserPictureEditComponent},
          {path:'', redirectTo:'StoreUserPictureMain',pathMatch: 'full' },
        ]
      },
      {path: 'StoreUserEdit', component: StoreUserEditComponent},
      {path: '', redirectTo: 'StoreUserPicture', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreUserRoutingModule {
}
