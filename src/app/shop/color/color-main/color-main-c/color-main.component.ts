import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {ColorService} from "../../color-service/color.service";
import {ColorDto} from "../../../../shared/dto/color/colorDto";
import {ColorSearchDto} from "../../../../shared/dto/color/colorSearchDto";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../../product/product-service/product.service";
import {ProductSearchDto} from "../../../../shared/dto/product/productSearchDto";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {ProductDto} from "../../../../shared/dto/product/productDto";
import {ProductPictureDto} from "../../../../shared/dto/productPicture/productPictureDto";
import {ProductPictureParamDto} from "../../../../shared/dto/productPicture/productPictureParamDto";
import {ProductPictureService} from "../../../product-picture/product-picture-service/product-picture.service";

@Component({
  selector: 'color-main',
  templateUrl: './color-main.component.html',
  styleUrls: ['./color-main.component.scss']
})

export class ColorMainComponent implements OnDestroy{
  public backendPictureUrl=environment.backendUrlPicture;
  public colorsDto:ColorDto[];
  public subscription:Subscription;
  public productPictureDto:ProductPictureDto;
  constructor(private colorService:ColorService, private title:Title,private toastService:ToastrService,private productPictureService:ProductPictureService) {}
  ngOnInit(): void {
    this.colorGetAll();
    this.title.setTitle(environment.titlePages.color.colorMain);
    this.productPictureGetByProductId(localStorage.getItem(environment.productId));
  }
  private productPictureGetByProductId(productId:string){
    let productPictureSearchDto=new ProductPictureParamDto();
    productPictureSearchDto.productId=productId;
    this.productPictureService.productPictureSetParam(productPictureSearchDto);
    this.subscription=this.productPictureService.productPictureGetAll().subscribe((res:ProductPictureDto[])=>{
      if(res){
        this.productPictureDto=res[0];
      }
    })
  }
  private colorGetAll(){
    let colorSearchDto=new ColorSearchDto();
    colorSearchDto.productId=localStorage.getItem(environment.productId);
    this.colorService.colorSearchDtoSet(colorSearchDto);
    this.subscription= this.colorService.colorGetAll().subscribe((res:ColorDto[])=>{
      this.colorsDto=res;
    });
  }
  public productPictureDelete(id: number) {
    if(confirm(environment.messages.color.doYouWantDeleteColor)==true){
      this.subscription=this.colorService.colorDelete(id).subscribe((res:boolean)=>{
        if(res==true){
          this.toastService.success(environment.messages.color.colorDeleteSuccess);
          this.colorGetAll()
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
