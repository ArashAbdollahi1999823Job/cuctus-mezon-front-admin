import {Component, OnDestroy} from '@angular/core';
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {ProductDto} from "../../../../shared/dto/product/productDto";
import {ProductService} from "../../product-service/product.service";
import {ProductParamDto} from "../../../../shared/dto/product/productParamDto";
@Component({
  selector: 'product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnDestroy{
  public paginationProduct:PaginationDto<ProductDto>;
  public subscription:Subscription;
  public productParamDto=new ProductParamDto;

  constructor(private productService:ProductService,private title:Title) {}
  ngOnInit(): void {
    this.productParamDto.storeId=localStorage.getItem('storeId');
    this.productService.productSetParam(this.productParamDto);
    this.productGetAll();
    this.title.setTitle("مدیریت محصولات فروشگاه بزرگ کاکتوس.");

  }
  public productGetAll(){
    this.subscription= this.productService.productGetAll().subscribe((res:PaginationDto<ProductDto>)=>{
      this.paginationProduct=res;
    });
  }
  public productUpdate(updated: boolean) {
    if (updated) this.productGetAll();
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
