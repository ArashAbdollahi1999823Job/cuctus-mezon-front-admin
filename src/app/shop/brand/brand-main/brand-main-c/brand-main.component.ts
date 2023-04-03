import {Component, OnDestroy} from '@angular/core';
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {BrandDto} from "../../../../shared/dto/brand/brandDto";
import {BrandService} from "../../brand-service/brand.service";
@Component({
  selector: 'brand-main',
  templateUrl: './brand-main.component.html',
  styleUrls: ['./brand-main.component.scss']
})
export class BrandMainComponent implements OnDestroy{
  public paginationBrand:PaginationDto<BrandDto>;
  public subscription:Subscription;
  constructor(private brandService:BrandService,private title:Title) {}
  ngOnInit(): void {
    this.brandGetAll();
    this.title.setTitle("مدیریت برند فروشگاه بزرگ کاکتوس.")
  }
  public brandGetAll(){
    this.subscription= this.brandService.brandGetAll().subscribe((res:PaginationDto<BrandDto>)=>{
      this.paginationBrand=res;
    });
  }
  public brandUpdate(updated: boolean) {
    if (updated) this.brandGetAll();
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
