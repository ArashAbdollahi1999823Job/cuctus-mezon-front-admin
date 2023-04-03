import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryRoutingModule } from './repository-routing.module';
import {RepositoryComponent} from "./repository-c/repository.component";
import {RepositoryNavComponent} from "./repository-nav/repository-nav.component";
import {InventoryComponent} from "./Inventory/inventory-c/inventory.component";
import {InventoryNavComponent} from "./Inventory/inventory-nav/inventory-nav.component";
import {InventoryAddComponent} from "./Inventory/inventory-add/inventory-add.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InventoryMainComponent} from "./Inventory/inventory-main/inventory-main-c/inventory-main.component";
import {InventoryEditComponent} from "./Inventory/inventory-main/inventory-edit/inventory-edit.component";
import {InventoryFilterComponent} from "./Inventory/inventory-main/inventory-filter/inventory-filter.component";
import {InventoryResultComponent} from "./Inventory/inventory-main/type-result/inventory-result.component";

@NgModule({
  declarations: [
    InventoryResultComponent,
    InventoryFilterComponent,
    InventoryEditComponent,
    InventoryMainComponent,
    InventoryAddComponent,
    InventoryNavComponent,
    InventoryComponent,
    RepositoryComponent,
    RepositoryNavComponent,
  ],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class RepositoryModule { }
