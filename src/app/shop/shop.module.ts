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
import {BrandNavComponent} from "./brand/brand-nav/brand-nav.component";
import {BrandAddComponent} from "./brand/brand-add/brand-add.component";
import {BrandComponent} from "./brand/brand-c/brand.component";
import {BrandMainComponent} from "./brand/brand-main/brand-main-c/brand-main.component";
import {BrandEditComponent} from "./brand/brand-main/brand-edit/brand-edit.component";
import {BrandFilterComponent} from "./brand/brand-main/brand-filter/brand-filter.component";
import {BrandPaginationComponent} from "./brand/brand-main/brand-pagination/brand-pagination.component";
import {BrandResultComponent} from "./brand/brand-main/brand-result/brand-result.component";
import {ProductPictureAddComponent} from "./product-picture/product-picture-add/product-picture-add.component";
import {ProductPictureComponent} from "./product-picture/product-picture-c/product-picture.component";
import {ProductPictureNavComponent} from "./product-picture/product-picture-nav/product-picture-nav.component";
import {
  ProductPictureMainComponent
} from "./product-picture/product-picture-main/product-picture-main-c/product-picture-main.component";
import {
  ProductPictureEditComponent
} from "./product-picture/product-picture-main/product-picture-edit/product-picture-edit.component";
import {OffNavComponent} from "./off/off-nav/off-nav.component";
import {OffAddComponent} from "./off/off-add/off-add.component";
import {OffComponent} from "./off/off-c/off.component";
import {OffEditComponent} from "./off/off-main/off-edit/off-edit.component";
import {OffMainComponent} from "./off/off-main/off-main-c/off-main.component";
import {OffResultComponent} from "./off/off-main/off-result/off-result.component";
import { ProductAddOffComponent } from './product/product-main/product-add-off/product-add-off.component';
import {ColorAddComponent} from "./color/color-add/color-add.component";
import {ColorNavComponent} from "./color/color-nav/color-nav.component";
import {ColorComponent} from "./color/color-c/color.component";
import {ColorMainComponent} from "./color/color-main/color-main-c/color-main.component";
import {TypeItemAddComponent} from "./type-item/type-item-add/type-item-add.component";
import {TypeItemMainComponent} from "./type-item/type-item-main/color-main-c/type-item-main.component";
import {TypeItemNavComponent} from "./type-item/type-item-nav/type-item-nav.component";
import {TypeItemComponent} from "./type-item/type-item-c/type-item.component";
import {ProductItemAddComponent} from "./product-item/product-item-add/product-item-add.component";
import {ProductItemMainComponent} from "./product-item/product-item-main/product-main-c/product-item-main.component";
import {ProductItemNavComponent} from "./product-item/product-item-nav/product-item-nav.component";
import {ProductItemComponent} from "./product-item/product-item-c/product-item.component";
@NgModule({
  declarations: [
    ProductItemComponent,
    ProductItemNavComponent,
    ProductItemMainComponent,
    ProductItemAddComponent,
    TypeItemComponent,
    TypeItemNavComponent,
    TypeItemMainComponent,
    TypeItemAddComponent,
    ColorMainComponent,
    ColorComponent,
    ColorNavComponent,
    ColorAddComponent,
    OffResultComponent,
    OffMainComponent,
    OffEditComponent,
    OffComponent,
    OffAddComponent,
    OffNavComponent,
    ProductPictureEditComponent,
    ProductPictureMainComponent,
    ProductPictureNavComponent,
    ProductPictureComponent,
    ProductPictureAddComponent,
    BrandResultComponent,
    BrandPaginationComponent,
    BrandFilterComponent,
    BrandEditComponent,
    BrandMainComponent,
    BrandComponent,
    BrandAddComponent,
    BrandNavComponent,
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
    TypeEditComponent,
    ProductAddOffComponent
  ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ]
})
export class ShopModule { }
