import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RepositoryComponent} from "./repository-c/repository.component";
import {SellerJustGuard} from "../shared/gurads/seller-just.guard";
import {InventoryComponent} from "./Inventory/inventory-c/inventory.component";
import {InventoryMainComponent} from "./Inventory/inventory-main/inventory-main-c/inventory-main.component";
import {InventoryAddComponent} from "./Inventory/inventory-add/inventory-add.component";
import {InventoryEditComponent} from "./Inventory/inventory-main/inventory-edit/inventory-edit.component";
import {
  InventoryOperationAddComponent
} from "./InventoryOperation/inventory-operation-add/inventory-operation-add.component";
import {InventoryOperationComponent} from "./InventoryOperation/inventory-operation-c/inventory-operation.component";
import {
  InventoryOperationMainComponent
} from "./InventoryOperation/inventory-operation-main/inventory-operation-main-c/inventory-operation-main.component";

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
      },
      {
        path: 'InventoryOperation', canActivate: [SellerJustGuard], component: InventoryOperationComponent, children:
          [
            {path: 'InventoryOperationMain', component: InventoryOperationMainComponent},
            {path: '', redirectTo: 'InventoryOperationMain', pathMatch: 'full'},
            {path: 'InventoryOperationAdd/:ProductId', component: InventoryOperationAddComponent},
          ]
      },
    ]
  }
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule {
}
