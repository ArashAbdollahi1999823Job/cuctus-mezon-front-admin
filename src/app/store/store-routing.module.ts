import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StoreMainComponent} from "./store-main/store-main-c/store-main.component";
import {StoreAddComponent} from "./store-add/store-add.component";
import {StoreEditComponent} from "./store-main/store-edit/store-edit.component";
import {StoreComponent} from "./store-c/store.component";
const routes: Routes = [
  {
    path: '', component: StoreComponent, children: [
      {path:'StoreMain',component:StoreMainComponent},
      { path:'', redirectTo:'StoreMain',pathMatch:'full'},
      { path:'StoreAdd', component:StoreAddComponent},
      { path:'StoreEdit/:StoreId', component:StoreEditComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
