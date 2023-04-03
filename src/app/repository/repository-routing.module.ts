import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepositoryComponent} from "./repository-c/repository.component";
import {ShopComponent} from "../shop/shop-c/shop.component";
import {AdminGuard} from "../shared/gurads/admin.guard";
import {TypeComponent} from "../shop/type/type-c/type.component";
import {TypeMainComponent} from "../shop/type/type-main/type-main-c/type-main.component";
import {TypeAddComponent} from "../shop/type/type-add/type-add.component";
import {TypeEditComponent} from "../shop/type/type-main/type-edit/type-edit.component";
import {SellerJustGuard} from "../shared/gurads/seller-just.guard";
import {InventoryComponent} from "./Inventory/inventory-c/inventory.component";
import {InventoryMainComponent} from "./Inventory/inventory-main/inventory-main-c/inventory-main.component";
import {InventoryAddComponent} from "./Inventory/inventory-add/inventory-add.component";
import {InventoryEditComponent} from "./Inventory/inventory-main/inventory-edit/inventory-edit.component";

const routes: Routes = [
  {
    path: '', component: RepositoryComponent, children: [
      {
        path: 'Inventory', canActivate: [SellerJustGuard], component: InventoryComponent, children:
          [
            {path: 'InventoryMain', component: InventoryMainComponent},
            {path: '', redirectTo: 'InventoryMain', pathMatch: 'full'},
            {path: 'InventoryAdd', component: InventoryAddComponent},
            {path: 'InventoryEdit/:id', component: InventoryEditComponent},
          ]
      }
    ]
  }
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule {
}
