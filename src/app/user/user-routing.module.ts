import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./user-c/user.component";
import {UserMainComponent} from "./user-main/user-main-c/user-main.component";
import {UserAddComponent} from "./user-add/user-add.component";
import {UserEditComponent} from "./user-main/user-edit/user-edit.component";
import {BossGuard} from "../shared/gurads/boss.guard";

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      {path:'main',component:UserMainComponent},
      { path:'', redirectTo:'main',pathMatch:'full'},
      { path:'add', component:UserAddComponent},
      { path:'main/edit/:id',canActivate:[BossGuard], component:UserEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
