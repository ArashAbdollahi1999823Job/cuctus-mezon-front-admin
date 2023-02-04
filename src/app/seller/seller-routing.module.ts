import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SellerComponent} from "./seller-c/seller.component";
import {SellerMainComponent} from "./seller-main/seller-main-c/seller-main.component";
import {SellerAddComponent} from "./seller-add/seller-add.component";
import {SellerEditComponent} from "./seller-main/seller-edit/seller-edit.component";

const routes: Routes = [
  {
    path: '', component: SellerComponent, children: [
      {path:'main',component:SellerMainComponent},
      { path:'', redirectTo:'main',pathMatch:'full'},
      { path:'add', component:SellerAddComponent},
      { path:'main/edit/:id', component:SellerEditComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
