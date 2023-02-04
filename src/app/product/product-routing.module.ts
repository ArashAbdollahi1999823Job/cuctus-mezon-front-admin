import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "../chat/chat-c/chat.component";
import {ProductComponent} from "./product-c/product.component";

const routes: Routes = [
  {path:'',component:ProductComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
