import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./user-c/user.component";
import {UserMainComponent} from "./user-main/user-main-c/user-main.component";
import {UserAddComponent} from "./user-add/user-add.component";
import {UserEditComponent} from "./user-main/user-edit/user-edit.component";
import {BossGuard} from "../shared/gurads/boss.guard";
import {AuthorizeGuard} from "../shared/gurads/authorize.guard";
import {AdminGuard} from "../shared/gurads/admin.guard";

const routes: Routes = [
  {
    path: '',canActivate:[AuthorizeGuard,AdminGuard], component: UsersComponent, children: [
      {path:'UserMain',component:UserMainComponent},
      { path:'', redirectTo:'UserMain',pathMatch:'full'},
      { path:'UserAdd', component:UserAddComponent},
      { path:'UserEdit/:UserId',canActivate:[BossGuard], component:UserEditComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
