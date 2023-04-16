import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {TypeDto} from "../../../../shared/dto/type/typeDto";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {ProductSearchDto} from "../../../../shared/dto/product/productSearchDto";
import {ProductService} from "../../product-service/product.service";
import {TypeService} from "../../../type/type-service/type.service";
import {InventoryDto} from "../../../../shared/dto/inventory/inventoryDto";
import {InventoryService} from "../../../../repository/Inventory/inventory-service/inventory.service";
import {InventoryParamDto} from "../../../../shared/dto/inventory/inventoryParamDto";
@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  @ViewChild("name",{static:false}) name:ElementRef;
  @Output() productUpdate=new EventEmitter<boolean>();
  public productParamDto=new ProductSearchDto;
  public typesDto:TypeDto[];
  public inventoriesDto:InventoryDto[];
  public inventoryParamDto:InventoryParamDto;

  constructor(private ef:ElementRef,private typeService: TypeService,private productService:ProductService,private inventoryService:InventoryService){}
  ngOnInit(): void {
    this.inventoryParamDto=this.inventoryService.inventoryGetParam();
    this.inventoryParamDto.storeId=localStorage.getItem('storeId');
    this.inventoryGet();
    this.typeGet();
    this.productParamDto=this.productService.productSearchDtoGet();
  }
  activeType=[
    {key:1,title:'فعال'},
    {key:2,title:'غیرفعال'},
  ];
  sortType=[
    {key:1,title:'اول به اخر'},
    {key:2,title:'اخر به اول'},
  ];
  typeGet() {
    this.typeService.typeGet().subscribe((res:PaginationDto<TypeDto>) => {
      this.typesDto = res.data;
    });
  }
  inventoryGet() {
    this.inventoryService.inventorySetParam(this.inventoryParamDto);
    this.inventoryService.inventoryGetAll().subscribe((res:InventoryDto[]) => {
      this.inventoriesDto = res;
    });
  }
  onChangeInventory(inventory:any) {
    this.productParamDto.inventoryId=inventory;
    this.productService.productSearchDtoSet(this.productParamDto);
    this.productUpdate.emit(true)
  }
  onChangeActiveType(activeType:any) {
    this.productParamDto.isActive=activeType;
    this.productService.productSearchDtoSet(this.productParamDto);
    this.productUpdate.emit(true)
  }
  onChangeSortType(sortType:any) {
    this.productParamDto.sortType=sortType;
    this.productService.productSearchDtoSet(this.productParamDto);
    this.productUpdate.emit(true)
  }
  onChangeType(type:any) {
    this.productParamDto.typeId=type;
    this.productService.productSearchDtoSet(this.productParamDto);
    this.productUpdate.emit(true)
  }
  changeNameSearch() {
    this.productParamDto.name=this.name?.nativeElement?.value;
    this.productService.productSearchDtoSet(this.productParamDto);
    this.productUpdate.emit(true)
  }
}
