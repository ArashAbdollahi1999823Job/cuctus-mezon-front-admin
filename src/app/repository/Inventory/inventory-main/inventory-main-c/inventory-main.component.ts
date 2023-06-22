import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {InventoryDto} from "../../../../shared/dto/inventory/inventoryDto";
import {InventoryService} from "../../inventory-service/inventory.service";
import {InventoryParamDto} from "../../../../shared/dto/inventory/inventoryParamDto";
import {environment} from "../../../../../environments/environment.prod";

@Component({
  selector: 'inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.scss']
})
export class InventoryMainComponent implements OnDestroy{
  public inventoriesDto:InventoryDto[];
  public subscription:Subscription;
  public inventoryParamDto=new InventoryParamDto();
  constructor(private inventoryService:InventoryService,private title:Title) {}
  ngOnInit(): void {
    this.inventoryGetAll();
    this.title.setTitle("مدیریت انبار فروشگاه بزرگ کاکتوس.");
    this.inventoryParamDto=this.inventoryService.inventoryGetParam();
  }
  public inventoryGetAll(){
    this.inventoryParamDto.storeId=localStorage.getItem(environment.storage.storeId);
    this.inventoryService.inventorySetParam(this.inventoryParamDto);
    this.subscription= this.inventoryService.inventoryGetAll().subscribe((res:InventoryDto[])=>{
      this.inventoriesDto=res;
    });
  }
  public inventoryUpdate(updated: boolean) {
    if (updated) this.inventoryGetAll();
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
