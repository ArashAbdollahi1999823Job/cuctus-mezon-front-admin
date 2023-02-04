import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedRoutingModule} from './shared-routing.module';
import {NavComponent} from "./components/nav/nav.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from "ngx-toastr";
import {PermissionRoleDirective} from './directives/permission-role.directive';


@NgModule({
  declarations: [NavComponent, PermissionRoleDirective],
  imports: [CommonModule, SharedRoutingModule, NgxSpinnerModule.forRoot({type: 'line-scale-pulse-out'}),
    ToastrModule.forRoot({
      positionClass: 'toast-top-full-width',
      progressAnimation: 'decreasing',
      timeOut: 5000,
      progressBar: true,
      preventDuplicates: true,
      closeButton: false
    })],
  exports: [NavComponent, NgxSpinnerModule, ToastrModule, PermissionRoleDirective]
})
export class SharedModule {
}
