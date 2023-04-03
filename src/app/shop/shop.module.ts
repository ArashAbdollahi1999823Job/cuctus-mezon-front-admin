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
import {ProductNavComponent} from "./product/product-nav/product-nav.component";
import {ProductComponent} from "./product/product-c/product.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";
import {ProductMainComponent} from "./product/product-main/product-main-c/product-main.component";
import {ProductFilterComponent} from "./product/product-main/product-filter/product-filter.component";
import {ProductResultComponent} from "./product/product-main/product-result/product-result.component";
import {ProductPaginationComponent} from "./product/product-main/product-pagination/product-pagination.component";
import {ProductEditComponent} from "./product/product-main/product-edit/product-edit.component";
@NgModule({
  declarations: [
    ProductEditComponent,
    ProductPaginationComponent,
    ProductResultComponent,
    ProductFilterComponent,
    ProductMainComponent,
    ProductAddComponent,
    ProductComponent,
    ProductNavComponent,
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
