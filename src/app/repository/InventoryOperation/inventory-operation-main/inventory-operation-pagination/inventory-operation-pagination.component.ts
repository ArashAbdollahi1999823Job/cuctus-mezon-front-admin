import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InventoryOperationParamDto} from "../../../../shared/dto/inventoryOperation/inventoryOperationParamDto";
import {InventoryOperationService} from "../../inventory-operation-service/inventory-operation.service";

@Component({
  selector: 'inventory-operation-pagination',
  templateUrl: './inventory-operation-pagination.component.html',
  styleUrls: ['./inventory-operation-pagination.component.scss']
})

export class InventoryOperationPaginationComponent implements OnChanges,OnInit {

 @Output() inventoryOperationUpdate=new EventEmitter<boolean>();
  public inventoryOperationParamDto: InventoryOperationParamDto;
  @Input() size: number ;
  @Input() index: number ;
  @Input() count: number ;
  countItems: number[] ;
  constructor(private inventoryOperationService:InventoryOperationService) {  }
  ngOnInit() {
    this.inventoryOperationParamDto = this.inventoryOperationService.inventoryOperationGetParam();
  }
  ngOnChanges(changes: SimpleChanges): void {
        this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    this.inventoryOperationParamDto.pageIndex=Number($event.srcElement.id);
    this.inventoryOperationService.inventoryOperationSetParam(this.inventoryOperationParamDto);
    this.inventoryOperationUpdate.emit(true);
  }
}
