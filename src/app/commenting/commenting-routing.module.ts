import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommentingComponent} from "./commenting-c/commenting.component";

const routes: Routes = [
  {path:'',component:CommentingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentingRoutingModule { }
