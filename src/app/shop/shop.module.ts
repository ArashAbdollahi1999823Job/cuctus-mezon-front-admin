import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import {ShopComponent} from "./shop-c/shop.component";
import {ShopNavComponent} from "./shop-nav/shop-nav.component";
import {TypeComponent} from "./type/type-c/type.component";
import {TypeNavComponent} from "./type/type-nav/type-nav.component";
import {TypeMainComponent} from "./type/type-main/type-main-c/type-main.component";
import {TypeFilterComponent} from "./type/type-main/type-filter/type-filter.component";
import {TypeResultComponent} from "./type/type-main/type-result/type-result.component";
import {TypePaginationComponent} from "./type/type-main/type-pagination/type-pagination.component";
import {TypeAddComponent} from "./type/type-add/type-add.component";
import {TypeEditComponent} from "./type/type-main/type-edit/type-edit.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {
  TypePictureMainComponent
} from "./type-picture/type-picture-main/type-picture-main-c/type-picture-main.component";
import {TypePictureNavComponent} from "./type-picture/type-picture-nav/type-picture-nav.component";
import {TypePictureComponent} from "./type-picture/type-picture-c/type-picture.component";
import {TypePictureAddComponent} from "./type-picture/type-picture-add/type-picture-add.component";
import {TypePictureEditComponent} from "./type-picture/type-picture-main/type-picture-edit/type-picture-edit.component";
@NgModule({
  declarations: [
    TypePictureMainComponent,
    TypePictureNavComponent,
    TypePictureComponent,
    TypePictureAddComponent,
    TypePictureEditComponent,
    ShopComponent,
    ShopNavComponent,
    TypeComponent,
    TypeNavComponent,
    TypeMainComponent,
    TypeFilterComponent,
    TypeResultComponent,
    TypePaginationComponent,
    TypeAddComponent,
    TypeEditComponent
  ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ]
})
export class ShopModule { }
