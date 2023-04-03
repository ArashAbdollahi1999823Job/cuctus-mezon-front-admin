import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {BrandService} from "../../brand-service/brand.service";
import {BrandParamDto} from "../../../../shared/dto/brand/brandParamDto";
@Component({
  selector: 'brand-pagination',
  templateUrl: './brand-pagination.component.html',
  styleUrls: ['./brand-pagination.component.scss']
})
export class BrandPaginationComponent {
  @Output() brandUpdate=new EventEmitter<boolean>();
  public brandParam: BrandParamDto;
  @Input() size: number ;
  @Input() index: number ;
  @Input() count: number ;
  countItems: number[];
  constructor(private brandService:BrandService) {  }
  ngOnInit() {
    this.brandParam = this.brandService.brandGetParam();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    this.brandParam.pageIndex=Number($event.srcElement.id);
    this.brandService.brandSetParam(this.brandParam);
    this.brandUpdate.emit(true);
  }
}
