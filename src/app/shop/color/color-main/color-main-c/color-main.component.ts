import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, Renderer2} from '@angular/core';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {ColorService} from "../../color-service/color.service";
import {ColorDto} from "../../../../shared/dto/color/colorDto";
import {ColorSearchDto} from "../../../../shared/dto/color/colorSearchDto";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {ProductPictureDto} from "../../../../shared/dto/productPicture/productPictureDto";
import {ProductPictureSearchDto} from "../../../../shared/dto/productPicture/productPictureSearchDto";
import {ProductPictureService} from "../../../product-picture/product-picture-service/product-picture.service";
@Component({
  selector: 'color-main',
  templateUrl: './color-main.component.html',
  styleUrls: ['./color-main.component.scss']
})

export class ColorMainComponent implements OnDestroy,AfterViewInit{
  public backendPictureUrl=environment.setting.url.backendUrlPicture;
  public colorsDto:ColorDto[];
  public subscription:Subscription;
  public productPictureDto:ProductPictureDto;
  constructor(private colorService:ColorService, private title:Title,private toastService:ToastrService,private productPictureService:ProductPictureService,private ef:ElementRef,private renderer: Renderer2) {}
  ngOnInit(): void {
    this.colorGetAll();
    this.title.setTitle(environment.titlePages.color.colorMain);
    this.productPictureGetByProductId(localStorage.getItem(environment.storage.productId));
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-150+ "px");
  }
  private productPictureGetByProductId(productId:string){
    let productPictureSearchDto=new ProductPictureSearchDto();
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
    colorSearchDto.productId=localStorage.getItem(environment.storage.productIdForColor);
    this.colorService.colorSearchDtoSet(colorSearchDto);
    this.subscription= this.colorService.colorGetAll().subscribe((res:ColorDto[])=>{
      this.colorsDto=res;
    });
  }
  public colorDelete(id: string) {
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
