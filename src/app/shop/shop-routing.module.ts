import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from "./shop-c/shop.component";
import {AdminGuard} from "../shared/gurads/admin.guard";
import {TypeComponent} from "./type/type-c/type.component";
import {TypeMainComponent} from "./type/type-main/type-main-c/type-main.component";
import {TypeAddComponent} from "./type/type-add/type-add.component";
import {TypeEditComponent} from "./type/type-main/type-edit/type-edit.component";
import {ProductComponent} from "./product-product/product.component";
import {TypePictureComponent} from "./type-picture/type-picture-c/type-picture.component";
import {
  TypePictureMainComponent
} from "./type-picture/type-picture-main/type-picture-main-c/type-picture-main.component";
import {TypePictureAddComponent} from "./type-picture/type-picture-add/type-picture-add.component";
import {TypePictureEditComponent} from "./type-picture/type-picture-main/type-picture-edit/type-picture-edit.component";




const routes: Routes = [
  {
    path: '', component: ShopComponent, children: [
      {
        path: 'Type', canActivate: [AdminGuard], component: TypeComponent, children:
          [
            {path: 'TypeMain', component:TypeMainComponent},
            {path: '', redirectTo: 'TypeMain', pathMatch: 'full'},
            {path: 'TypeAdd', component: TypeAddComponent},
            {path: 'TypeEdit/:id', component: TypeEditComponent},
          ]
      },
      {path: 'Product', component: ProductComponent},
      {path: '', redirectTo: 'Product', pathMatch: 'full'},
      {
        path: 'TypePicture/:TypeId', component: TypePictureComponent, children:
          [
            {path: 'TypePictureMain', component: TypePictureMainComponent},
            {path: '', redirectTo: 'TypePictureMain', pathMatch: 'full'},
            {path: 'TypePictureAdd', component: TypePictureAddComponent},
            {path: 'TypePictureEdit/:TypePictureId', component: TypePictureEditComponent},
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
