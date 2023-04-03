import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {InventoryParamDto} from "../../../../shared/dto/inventory/inventoryParamDto";
import {InventoryService} from "../../inventory-service/inventory.service";
@Component({
  selector: 'inventory-filter',
  templateUrl: './inventory-filter.component.html',
  styleUrls: ['./inventory-filter.component.scss']
})
export class InventoryFilterComponent {
  @ViewChild("name",{static:false}) name:ElementRef;
  @Output() inventoryUpdate=new EventEmitter<boolean>();
  public inventoryParam=new InventoryParamDto;
  constructor(private ef:ElementRef,private inventoryService: InventoryService){}
  ngOnInit(): void {
    this.inventoryParam=this.inventoryService.inventoryGetParam();
  }
  activeType=[
    {key:1,title:'فعال'},
    {key:2,title:'غیرفعال'},
  ];
  onChangeActiveType(activeType:any) {
    this.inventoryParam.activeType=activeType;
    this.inventoryService.inventorySetParam(this.inventoryParam);
    this.inventoryUpdate.emit(true)
  }
  changeNameSearch() {
    this.inventoryParam.name=this.name?.nativeElement?.value;
    this.inventoryService.inventorySetParam(this.inventoryParam);
    this.inventoryUpdate.emit(true)
  }
}
