import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {BrandParamDto} from "../../../../shared/dto/brand/brandParamDto";
import {BrandService} from "../../brand-service/brand.service";
@Component({
  selector: 'brand-filter',
  templateUrl: './brand-filter.component.html',
  styleUrls: ['./brand-filter.component.scss']
})
export class BrandFilterComponent {
  @ViewChild("name",{static:false}) name:ElementRef;
  @Output() brandUpdate=new EventEmitter<boolean>();
  public brandParam=new BrandParamDto;
  constructor(private ef:ElementRef,private brandService: BrandService){}
  ngOnInit(): void {
    this.brandParam=this.brandService.brandGetParam();
  }
  sortType=[
    {key:1,title:'اول به اخر'},
    {key:2,title:'اخر به اول'},
  ];

  onChangeSortType(sortType:any) {
    this.brandParam.sortType=sortType;
    this.brandService.brandSetParam(this.brandParam);
    this.brandUpdate.emit(true)
  }
  changeNameSearch() {
    this.brandParam.name=this.name?.nativeElement?.value;
    this.brandService.brandSetParam(this.brandParam);
    this.brandUpdate.emit(true)
  }
}
