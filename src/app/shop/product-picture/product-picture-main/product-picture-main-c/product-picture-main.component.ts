import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {ProductPictureDto} from "../../../../shared/dto/productPicture/productPictureDto";
import {ProductPictureService} from "../../product-picture-service/product-picture.service";
import {ProductPictureSearchDto} from "../../../../shared/dto/productPicture/productPictureSearchDto";
import {Router} from "@angular/router";

@Component({
  selector: 'product-picture-main',
  templateUrl: './product-picture-main.component.html',
  styleUrls: ['./product-picture-main.component.scss']
})
export class ProductPictureMainComponent implements OnInit,OnDestroy,AfterViewInit{
  public productPicturesDto:ProductPictureDto[];
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  public subscription:Subscription;
  productId:string;
  constructor(private productPictureService:ProductPictureService,private toastService: ToastrService,private router:Router,private ef:ElementRef,private renderer: Renderer2) {}
  ngOnInit(): void {
    this.checkStorage();
    this.getProductPicture();
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-150+ "px");
  }
  private checkStorage() {
    this.productId = localStorage.getItem(environment.storage.productIdForProductPictureMain);
    window.addEventListener('storage', (e) => {
      if (this.productId != localStorage.getItem(environment.storage.productIdForProductPictureMain)) {
        this.router.navigateByUrl('/Shop')
      }
    })
  }
  public getProductPicture(){
    let productPictureSearchDto=new ProductPictureSearchDto();
    productPictureSearchDto.productId=this.productId;
    this.productPictureService.productPictureSetParam(productPictureSearchDto);
    this.subscription= this.productPictureService.productPictureGetAll().subscribe((res:ProductPictureDto[])=>{
      if(res)
      this.productPicturesDto=res;
    });
  }
  productPictureDelete(id: string) {
    if(confirm(environment.messages.productPicture.productPictureDoYouWantDelete)){
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
