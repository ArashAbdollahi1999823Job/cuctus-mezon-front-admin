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
import {Router} from "@angular/router";
@Component({
  selector: 'product-item-main',
  templateUrl: './product-item-main.component.html',
  styleUrls: ['./product-item-main.component.scss']
})

export class ProductItemMainComponent implements OnDestroy{
  public backendUrlPicture=environment.backendUrlPicture;
  public productItemsDto:ProductItemDto[];
  public typeItemsDto:TypeItemDto[];
  public subscription:Subscription;
  public productId:string;
  public typeItemToDelete:TypeItemDto[]=[];
  public index:number;

  public productPictureUrl:string;
  constructor(private productItemService:ProductItemService, private title:Title, private toastService:ToastrService,private typeItemService:TypeItemService,private router:Router) {}
  ngOnInit(): void {
    this.productItemGetAll();
    this.title.setTitle(environment.titlePages.productItem.productItemMain);
    this.productPictureUrl=localStorage.getItem(environment.productPicture)
    this.productId=localStorage.getItem(environment.productId)
  }
  private productItemGetAll(){
    let productItemSearchDto=new ProductItemSearchDto();
    productItemSearchDto.productId=localStorage.getItem(environment.productId);
    this.productItemService.productItemSearchDtoSet(productItemSearchDto);
    this.subscription= this.productItemService.productItemGetAll().subscribe((res:ProductItemDto[])=>{
      this.productItemsDto=res;
      this.typeItemGetAll();
    });
  }
  private typeItemGetAll(){
    let typeItemSearchDto=new TypeItemSearchDto();
    typeItemSearchDto.typeId=localStorage.getItem(environment.typeId);
    this.typeItemService.typeItemSearchDtoSet(typeItemSearchDto);
    this.subscription= this.typeItemService.typeItemGetAll().subscribe((res:TypeItemDto[])=>{
      this.typeItemsDto=res;
      this.one();
    });
  }

  public one(){
    this.productItemsDto.forEach(product=>{
      this.typeItemsDto.forEach(typeItem=>{
        if(typeItem.name==product.name)this.typeItemToDelete.push(typeItem)
      })
    })
   this.typeItemsDto= this.typeItemsDto.filter(x=>this.typeItemToDelete.indexOf(x) <0)
  }


  public productItemDelete(id: number) {
    if(confirm(environment.messages.productItem.doYouWantDeleteProductItem)){
      this.subscription=this.productItemService.productItemDelete(id).subscribe((res:boolean)=>{
        if(res==true){
          this.toastService.success(environment.messages.productItem.productItemDeleteSuccess);
          this.productItemGetAll()
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }

  setNameToAdd(name: string) {
    localStorage.setItem(environment.typeItemName,name);
  }
}
