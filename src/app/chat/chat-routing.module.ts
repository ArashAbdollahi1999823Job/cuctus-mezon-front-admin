import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from "./chat-c/chat.component";
import {ChatBodyComponent} from "./chat-body/chat-body.component";
const routes: Routes = [
  {
    path: '', component: ChatComponent, children: [
      {path:':PhoneNumber',component:ChatBodyComponent},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}
