import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "../chat/chat-c/chat.component";
import {InventoryComponent} from "./inventory-c/inventory.component";

const routes: Routes = [
  {path:'',component:InventoryComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
