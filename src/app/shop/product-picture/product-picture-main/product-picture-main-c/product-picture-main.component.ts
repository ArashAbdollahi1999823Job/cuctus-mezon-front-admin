import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {ProductPictureDto} from "../../../../shared/dto/productPicture/productPictureDto";
import {ProductPictureService} from "../../product-picture-service/product-picture.service";
import {ProductPictureSearchDto} from "../../../../shared/dto/productPicture/productPictureSearchDto";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductDto} from "../../../../shared/dto/product/productDto";

@Component({
  selector: 'product-picture-main',
  templateUrl: './product-picture-main.component.html',
  styleUrls: ['./product-picture-main.component.scss']
})
export class ProductPictureMainComponent implements OnInit,OnDestroy{

  public productPicturesDto:ProductPictureDto[];
  public backendUrlPicture = environment.backendUrlPicture;
  public subscription:Subscription;
  productId:string;
  constructor(private productPictureService:ProductPictureService,private toastService: ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.productId=localStorage.getItem(environment.productIdForProductPictureMain);
    window.addEventListener('storage',(e)=>{
      if(this.productId!=localStorage.getItem(environment.productIdForProductPictureMain)){
        this.router.navigateByUrl('/Shop')
      }
    })
    this.getProductPicture();
  }
  public getProductPicture(){
    let productPictureSearchDto=new ProductPictureSearchDto();
    productPictureSearchDto.productId=localStorage.getItem(environment.productIdForProductPictureMain);
    this.productPictureService.productPictureSetParam(productPictureSearchDto);
    this.subscription= this.productPictureService.productPictureGetAll().subscribe((res:ProductPictureDto[])=>{
      if(res)
      this.productPicturesDto=res;
    });
  }
  productPictureDelete(id: number) {
    if(confirm(environment.messages.productPicture.doYouWantDeleteProductItem)){
     this.subscription= this.productPictureService.productPictureDelete(id).subscribe((res:boolean)=>{
        if(res==true){
          this.toastService.success(environment.messages.productPicture.productPictureDeleteSuccess)
          this.getProductPicture();
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
