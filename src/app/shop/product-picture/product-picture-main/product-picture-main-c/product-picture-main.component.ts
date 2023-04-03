import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {TypePictureDto} from "../../../../shared/dto/typePicture/typePictureDto";
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {ProductPictureDto} from "../../../../shared/dto/productPicture/productPictureDto";
import {ProductPictureService} from "../../product-picture-service/product-picture.service";

@Component({
  selector: 'product-picture-main',
  templateUrl: './product-picture-main.component.html',
  styleUrls: ['./product-picture-main.component.scss']
})
export class ProductPictureMainComponent implements OnInit,OnDestroy{

  public productPicturesDto:ProductPictureDto[]|undefined;
  public backendUrlPicture = environment.backendUrlPicture;
  public subscription:Subscription;
  constructor(private productPictureService:ProductPictureService,private toastService: ToastrService) {}
  ngOnInit(): void {
    this.getProductPicture();

  }
  public getProductPicture(){
    this.subscription= this.productPictureService.productPictureGetAll().subscribe((res:ProductPictureDto[])=>{
      this.productPicturesDto=res;
    });
  }

  productPictureDelete(id: number) {
    if(confirm("ایا از حذف فیزیکی عکس  مطمعن هستید؟")){
     this.subscription= this.productPictureService.productPictureDelete(id).subscribe((res:boolean)=>{
        if(res==true){
          this.toastService.success(`عکس با موفقیت حذف شد.`)
          this.getProductPicture();
        }
      })
    }

  }

  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
