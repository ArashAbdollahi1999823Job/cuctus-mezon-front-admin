import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SellerRoutingModule} from './seller-routing.module';
import {SellerComponent} from './seller-c/seller.component';
import {SellerNavComponent} from './seller-nav/seller-nav.component';
import {SellerAddComponent} from './seller-add/seller-add.component';
import {SellerEditComponent} from './seller-main/seller-edit/seller-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SellerResultComponent} from "./seller-main/seller-result/seller-result.component";
import {SellerPaginationComponent} from "./seller-main/seller-pagination/seller-pagination.component";
import {SellerFilterComponent} from "./seller-main/seller-filter/seller-filter.component";
import {SellerMainComponent} from "./seller-main/seller-main-c/seller-main.component";

@NgModule({
  declarations: [
    SellerMainComponent,
    SellerResultComponent,
    SellerPaginationComponent,
    SellerFilterComponent,
    SellerComponent,
    SellerNavComponent,
    SellerAddComponent,
    SellerEditComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule
  ]
})
export class SellerModule {
}
