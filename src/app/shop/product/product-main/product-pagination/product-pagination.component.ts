import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {ProductService} from "../../product-service/product.service";
import {ProductSearchDto} from "../../../../shared/dto/product/productSearchDto";
@Component({
  selector: 'product-pagination',
  templateUrl: './product-pagination.component.html',
  styleUrls: ['./product-pagination.component.scss']
})
export class ProductPaginationComponent {
  @Output() productUpdate=new EventEmitter<boolean>();
  public productParamDto: ProductSearchDto;
  @Input() size: number ;
  @Input() index: number ;
  @Input() count: number ;
  countItems: number[];
  constructor(private productService:ProductService) {  }
  ngOnInit() {
    this.productParamDto = this.productService.productSearchDtoGet();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    this.productParamDto.pageIndex=Number($event.srcElement.id);
    this.productService.productSearchDtoSet(this.productParamDto);
    this.productUpdate.emit(true);
  }
}
