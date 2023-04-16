import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from "./shop-c/shop.component";
import {AdminGuard} from "../shared/gurads/admin.guard";
import {TypeComponent} from "./type/type-c/type.component";
import {TypeMainComponent} from "./type/type-main/type-main-c/type-main.component";
import {TypeAddComponent} from "./type/type-add/type-add.component";
import {TypeEditComponent} from "./type/type-main/type-edit/type-edit.component";
import {TypePictureComponent} from "./type-picture/type-picture-c/type-picture.component";
import {
  TypePictureMainComponent
} from "./type-picture/type-picture-main/type-picture-main-c/type-picture-main.component";
import {TypePictureAddComponent} from "./type-picture/type-picture-add/type-picture-add.component";
import {TypePictureEditComponent} from "./type-picture/type-picture-main/type-picture-edit/type-picture-edit.component";
import {SellerJustGuard} from "../shared/gurads/seller-just.guard";
import {ProductComponent} from "./product/product-c/product.component";
import {ProductAddComponent} from "./product/product-add/product-add.component";
import {ProductMainComponent} from "./product/product-main/product-main-c/product-main.component";
import {ProductEditComponent} from "./product/product-main/product-edit/product-edit.component";
import {BrandAddComponent} from "./brand/brand-add/brand-add.component";
import {BrandComponent} from "./brand/brand-c/brand.component";
import {BrandMainComponent} from "./brand/brand-main/brand-main-c/brand-main.component";
import {BrandEditComponent} from "./brand/brand-main/brand-edit/brand-edit.component";
import {
  ProductPictureEditComponent
} from "./product-picture/product-picture-main/product-picture-edit/product-picture-edit.component";
import {ProductPictureAddComponent} from "./product-picture/product-picture-add/product-picture-add.component";
import {
  ProductPictureMainComponent
} from "./product-picture/product-picture-main/product-picture-main-c/product-picture-main.component";
import {ProductPictureComponent} from "./product-picture/product-picture-c/product-picture.component";
import {OffComponent} from "./off/off-c/off.component";
import {OffMainComponent} from "./off/off-main/off-main-c/off-main.component";
import {OffAddComponent} from "./off/off-add/off-add.component";
import {OffEditComponent} from "./off/off-main/off-edit/off-edit.component";
import {ProductAddOffComponent} from "./product/product-main/product-add-off/product-add-off.component";
import {ColorAddComponent} from "./color/color-add/color-add.component";
import {ColorComponent} from "./color/color-c/color.component";
import {ColorMainComponent} from "./color/color-main/color-main-c/color-main.component";
const routes: Routes = [
  {
    path: '', component: ShopComponent, children: [
      {
        path: 'Color/:ProductId', canActivate: [SellerJustGuard], component: ColorComponent, children:
          [
            {path: 'ColorMain', component: ColorMainComponent},
            {path: '', redirectTo: 'ColorMain', pathMatch: 'full'},
            {path: 'ColorAdd', component: ColorAddComponent},
          ]
      },
      {
        path: 'Type', canActivate: [AdminGuard], component: TypeComponent, children:
          [
            {path: 'TypeMain', component: TypeMainComponent},
            {path: '', redirectTo: 'TypeMain', pathMatch: 'full'},
            {path: 'TypeAdd', component: TypeAddComponent},
            {path: 'TypeEdit/:id', component: TypeEditComponent},
          ]
      },
      {
        path: 'Brand', canActivate: [AdminGuard], component: BrandComponent, children:
          [
            {path: 'BrandMain', component: BrandMainComponent},
            {path: '', redirectTo: 'BrandMain', pathMatch: 'full'},
            {path: 'BrandAdd', component: BrandAddComponent},
            {path: 'BrandEdit/:BrandId', component: BrandEditComponent},
          ]
      },
      {
        path: 'Off', canActivate: [SellerJustGuard], component: OffComponent, children:
          [
            {path: 'OffMain', component: OffMainComponent},
            {path: '', redirectTo: 'OffMain', pathMatch: 'full'},
            {path: 'OffAdd', component: OffAddComponent},
            {path: 'OffEdit/:OffId', component: OffEditComponent},
          ]
      },
      {
        path: 'Product', canActivate: [SellerJustGuard], component: ProductComponent, children: [
          {path: 'ProductMain', component: ProductMainComponent},
          {path: '', redirectTo: 'ProductMain', pathMatch: 'full'},
          {path: 'ProductAdd', component: ProductAddComponent},
          {path: 'ProductEdit/:ProductId', component: ProductEditComponent},
          {path: 'ProductAddOff/:ProductId', component: ProductAddOffComponent},
        ]
      },
      {
        path: 'TypePicture/:TypeId', component: TypePictureComponent, children:
          [
            {path: 'TypePictureMain', component: TypePictureMainComponent},
            {path: '', redirectTo: 'TypePictureMain', pathMatch: 'full'},
            {path: 'TypePictureAdd', component: TypePictureAddComponent},
            {path: 'TypePictureEdit/:TypePictureId', component: TypePictureEditComponent},
          ]
      },
      {
        path: 'ProductPicture/:ProductId', component: ProductPictureComponent, children:
          [
            {path: 'ProductPictureMain', component: ProductPictureMainComponent},
            {path: '', redirectTo: 'ProductPictureMain', pathMatch: 'full'},
            {path: 'ProductPictureAdd', component: ProductPictureAddComponent},
            {path: 'ProductPictureEdit/:ProductPictureId', component: ProductPictureEditComponent},
          ]
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
