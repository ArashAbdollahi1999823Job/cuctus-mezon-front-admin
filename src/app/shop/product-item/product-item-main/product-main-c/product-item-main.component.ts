import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {ProductItemService} from "../../product-item-service/product-item.service";
import {ProductItemDto} from "../../../../shared/dto/productItem/productItemDto";
import {ProductItemSearchDto} from "../../../../shared/dto/productItem/productItemSearchDto";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {TypeItemSearchDto} from "../../../../shared/dto/typeItem/typeItemSearchDto";
import {TypeItemService} from "../../../type-item/type-item-service/type-item.service";
import {TypeItemDto} from "../../../../shared/dto/typeItem/typeItemDto";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'product-item-main',
  templateUrl: './product-item-main.component.html',
  styleUrls: ['./product-item-main.component.scss']
})

export class ProductItemMainComponent implements OnDestroy{
  public backendUrlPicture=environment.backendUrlPicture;
  public productPictureUrl:string;
  public productItemDtos:ProductItemDto[];
  public typeItemDtos:TypeItemDto[];
  public productId:string;
  public typeId:string;
  public typeItemToDelete:TypeItemDto[]=[];
  public index:number;
  public subscription:Subscription;
  constructor(private productItemService:ProductItemService, private title:Title,private activatedRoute:ActivatedRoute,private router:Router
             , private toastService:ToastrService,private typeItemService:TypeItemService) {}
  ngOnInit(): void {
    this.typeId=localStorage.getItem(environment.typeIdForProductItemMain);
    this.productId=localStorage.getItem(environment.productIdForProductItemMain);
    this.productPictureUrl=localStorage.getItem(environment.productPictureForProductItemMain);
    this.title.setTitle(environment.titlePages.productItem.productItemMain);
    this.productItemGetAll();
    this.checkStorage();
  }
  private checkStorage() {
    window.addEventListener('storage', (e) => {
      if (this.productId != localStorage.getItem(environment.productIdForProductItemMain)
      ||this.typeId != localStorage.getItem(environment.typeIdForProductItemMain))
       {
        this.router.navigateByUrl('/Shop')
      }
    })
  }
  private productItemGetAll(){
    let productItemSearchDto=new ProductItemSearchDto();
    productItemSearchDto.productId=this.productId;
    this.productItemService.productItemSearchDtoSet(productItemSearchDto);
    this.subscription= this.productItemService.productItemGetAll().subscribe((res:ProductItemDto[])=>{
      this.productItemDtos=res;
      this.typeItemGetAll();
    });
  }
  private typeItemGetAll(){
    let typeItemSearchDto=new TypeItemSearchDto();
    typeItemSearchDto.typeId=this.typeId;
    this.typeItemService.typeItemSearchDtoSet(typeItemSearchDto);
    this.subscription= this.typeItemService.typeItemGetAll().subscribe((res:TypeItemDto[])=>{
      this.typeItemDtos=res;
      this.typeItemCalculateDelete();
    });
  }
  public typeItemCalculateDelete(){
    this.productItemDtos.forEach(product=>{
      this.typeItemDtos.forEach(typeItem=>{
        if(typeItem.name==product.name)this.typeItemToDelete.push(typeItem)
      })
    })
   this.typeItemDtos= this.typeItemDtos.filter(x=>this.typeItemToDelete.indexOf(x) <0)
  }
  public productItemDelete(id: string) {
    if(confirm(environment.messages.productItem.productItemDoYouWantDelete)){
      this.subscription=this.productItemService.productItemDelete(id).subscribe((res:boolean)=>{
        if(res==true){
          this.toastService.success(environment.messages.productItem.productItemDeleteSuccess);
          this.productItemGetAll()
        }
      })
    }
  }
  public setNameToAdd(name: string) {
    localStorage.setItem(environment.typeItemName,name);
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}
