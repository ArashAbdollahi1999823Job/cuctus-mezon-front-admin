import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {InventoryDto} from "../../../../shared/dto/inventory/inventoryDto";
import {InventoryParamDto} from "../../../../shared/dto/inventory/inventoryParamDto";
import {InventoryOperationService} from "../../inventory-operation-service/inventory-operation.service";
import {InventoryService} from "../../../Inventory/inventory-service/inventory.service";
import {InventoryOperationParamDto} from "../../../../shared/dto/inventoryOperation/inventoryOperationParamDto";
@Component({
  selector: 'inventory-operation-filter',
  templateUrl: './inventory-operation-filter.component.html',
  styleUrls: ['./inventory-operation-filter.component.scss']
})
export class InventoryOperationFilterComponent implements OnInit{

  public inventoriesDto: InventoryDto[];
  public inventoryOperationParamDto:InventoryOperationParamDto;
  @ViewChild("price",{static:false}) price:ElementRef;
  @ViewChild("count",{static:false}) count:ElementRef;
  @Output() inventoryOperationUpdate=new EventEmitter<boolean>();
  constructor(private ef:ElementRef,private inventoryOperationService: InventoryOperationService,private inventoryService:InventoryService){}
  ngOnInit(): void {
    this.inventoryGet();
    this.inventoryOperationParamDto=this.inventoryOperationService.inventoryOperationGetParam();
  }
  inventoryOperationType=[
    {key:1,title:'افزایشی'},
    {key:2,title:'کاهشی'},
    {key:3,title:'فروشی'},
    {key:4,title:'خرید'},
  ];
  sortType=[
    {key:1,title:'اول به اخر'},
    {key:2,title:'اخر به اول'},
  ];
  inventoryGet() {
    let inventoryParamDto = new InventoryParamDto();
    inventoryParamDto.storeId=localStorage.getItem('storeId');
    this.inventoryService.inventorySetParam(inventoryParamDto);
    this.inventoryService.inventoryGetAll().subscribe((res:InventoryDto[]) => {
      this.inventoriesDto = res;
    });
  }
  changePriceSearch() {
    this.inventoryOperationParamDto.price=this.price?.nativeElement?.value;
    this.inventoryOperationService.inventoryOperationSetParam(this.inventoryOperationParamDto);
    this.inventoryOperationUpdate.emit(true)
  }
  changeCountSearch() {
    this.inventoryOperationParamDto.count=this.count?.nativeElement?.value;
    this.inventoryOperationService.inventoryOperationSetParam(this.inventoryOperationParamDto);
    this.inventoryOperationUpdate.emit(true)
  }
  onChangeInventoryOperationType(inventoryOperationType:any) {
    this.inventoryOperationParamDto.inventoryOperationType=inventoryOperationType;
    this.inventoryOperationService.inventoryOperationSetParam(this.inventoryOperationParamDto);
    this.inventoryOperationUpdate.emit(true)
  }
  onChangeSortType(sortType:any) {
    this.inventoryOperationParamDto.sortType=sortType;
    this.inventoryOperationService.inventoryOperationSetParam(this.inventoryOperationParamDto);
    this.inventoryOperationUpdate.emit(true)
  }
  onChangeInventory(inventoryId:any) {
    this.inventoryOperationParamDto.inventoryId=inventoryId;
    this.inventoryOperationService.inventoryOperationSetParam(this.inventoryOperationParamDto);
    this.inventoryOperationUpdate.emit(true)
  }
}
