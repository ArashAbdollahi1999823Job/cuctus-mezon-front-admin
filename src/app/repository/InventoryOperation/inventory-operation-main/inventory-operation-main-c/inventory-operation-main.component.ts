import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {InventoryOperationDto} from "../../../../shared/dto/inventoryOperation/inventoryOperationDto";
import {InventoryOperationService} from "../../inventory-operation-service/inventory-operation.service";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {InventoryOperationParamDto} from "../../../../shared/dto/inventoryOperation/inventoryOperationParamDto";
@Component({
  selector: 'inventory-operation-main',
  templateUrl: './inventory-operation-main.component.html',
  styleUrls: ['./inventory-operation-main.component.scss']
})

export class InventoryOperationMainComponent implements OnInit, OnDestroy{
  public paginationInventoryOperation:PaginationDto<InventoryOperationDto>;
  public subscription:Subscription;
  public inventoryOperationParamDto:InventoryOperationParamDto;
  constructor(private inventoryOperationService:InventoryOperationService) {}
  ngOnInit(): void {
    this.inventoryOperationParamDto=this.inventoryOperationService.inventoryOperationGetParam();
    this.inventoryOperationParamDto.storeId=localStorage.getItem('storeId');
    this.inventoryOperationService.inventoryOperationSetParam(this.inventoryOperationParamDto);
    this.inventoryOperationGetAll();
  }
  public inventoryOperationGetAll(){
    this.subscription= this.inventoryOperationService.inventoryOperationGetAll().subscribe((res:PaginationDto<InventoryOperationDto>)=>{
      this.paginationInventoryOperation=res;
    });
  }
  public inventoryOperationUpdate(updated: boolean) {
    if (updated) this.inventoryOperationGetAll();
  }

  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
