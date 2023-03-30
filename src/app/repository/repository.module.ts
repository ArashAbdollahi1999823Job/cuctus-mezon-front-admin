import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory-c/inventory.component';
import {InventoryNavComponent} from "./inventory-nav/inventory-nav.component";


@NgModule({
  declarations: [
    InventoryComponent,
    InventoryNavComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
