import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {StoreRoutingModule} from "./store-routing.module";
import {StoreEditComponent} from "./store-main/store-edit/store-edit.component";
import {StoreNavComponent} from "./store-nav/store-nav.component";
import {StoreAddComponent} from "./store-add/store-add.component";
import {StoreFilterComponent} from "./store-main/store-filter/store-filter.component";
import {StorePaginationComponent} from "./store-main/store-pagination/store-pagination.component";
import {StoreResultComponent} from "./store-main/store-result/store-result.component";
import {StoreMainComponent} from "./store-main/store-main-c/store-main.component";
import {StoreComponent} from "./store-c/store.component";
@NgModule({
  declarations: [
    StoreComponent,
    StoreMainComponent,
    StoreResultComponent,
    StorePaginationComponent,
    StoreFilterComponent,
    StoreAddComponent,
    StoreNavComponent,
    StoreEditComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule
  ]
})
export class StoreModule {
}
