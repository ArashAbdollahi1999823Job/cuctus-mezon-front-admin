import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {TypeParamDto} from "../../../../shared/dto/type/typeParamDto";
import {TypeDto} from "../../../../shared/dto/type/typeDto";
import {TypeService} from "../../type-service/type.service";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
@Component({
  selector: 'type-filter',
  templateUrl: './type-filter.component.html',
  styleUrls: ['./type-filter.component.scss']
})
export class TypeFilterComponent {
  @ViewChild("name",{static:false}) name:ElementRef;
  @Output() typeUpdate=new EventEmitter<boolean>();
  public typeParam=new TypeParamDto;
  public typesDto:TypeDto[];
 // public allProductType:ProductTypeDto[];
  constructor(private ef:ElementRef,private typeService: TypeService){}
  ngOnInit(): void {
   // this.getProductType();
    this.typeGet();
    this.typeParam=this.typeService.typeGetParam();
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
/*  getProductType() {
    this.productTypeService.setProductTypeParams(this.productTypeParams);
    this.productTypeService.getProductType().subscribe((res) => {
      this.productType = res.data;
    });
  }*/
  onChangeActiveType(activeType:any) {
    this.typeParam.activeType=activeType;
    this.typeService.typeSetParam(this.typeParam);
    this.typeUpdate.emit(true)
  }
  onChangeSortType(sortType:any) {
    this.typeParam.sortType=sortType;
    this.typeService.typeSetParam(this.typeParam);
    this.typeUpdate.emit(true)
  }
  onChangeType(type:any) {
    this.typeParam.parentTypeId=type;
    this.typeService.typeSetParam(this.typeParam);
    this.typeUpdate.emit(true)
  }
  changeNameSearch() {
    this.typeParam.name=this.name?.nativeElement?.value;
    this.typeService.typeSetParam(this.typeParam);
    this.typeUpdate.emit(true)
  }
}
