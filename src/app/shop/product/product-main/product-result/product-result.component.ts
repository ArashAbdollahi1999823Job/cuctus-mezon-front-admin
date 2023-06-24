import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output, Renderer2,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {ProductDto} from "../../../../shared/dto/product/productDto";
import {ProductService} from "../../product-service/product.service";
import {ProductEditDto} from "../../../../shared/dto/product/ProductEditDto";
import {environment} from "../../../../../environments/environment";
import {ProductPictureService} from "../../../product-picture/product-picture-service/product-picture.service";
import {ProductPictureSearchDto} from "../../../../shared/dto/productPicture/productPictureSearchDto";
import {ProductPictureDto} from "../../../../shared/dto/productPicture/productPictureDto";
@Component({
  selector: 'product-result',
  templateUrl: './product-result.component.html',
  styleUrls: ['./product-result.component.scss']
})
export class ProductResultComponent implements OnDestroy, OnChanges,AfterViewInit {
  @Input("productDtos") productDtos: ProductDto[];
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  @Output() productUpdate = new EventEmitter<boolean>();
  private subscription: Subscription;
  constructor(private productService: ProductService, private toastService: ToastrService, private productPictureService: ProductPictureService,private ef:ElementRef,private renderer: Renderer2) {
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-280+ "px");
  }
  public productDelete(id: string):void {
    if (confirm(environment.messages.product.productDoYouWantDelete)){
      this.subscription = this.productService.productDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(environment.messages.product.productDeleteSuccess)
          this.productUpdate.emit(true)
        }
      })
    }
  }
  public productOffDelete(id: string):void {
    if (confirm(environment.messages.off.offDoYouWantToCancel)) {
      var productDto = this.productDtos.find(x => x.id == id);
      var productEditDto = new ProductEditDto();
      productEditDto.id = productDto.id.toString();
      productEditDto.name = productDto.name;
      productEditDto.slug = productDto.slug;
      productEditDto.description = productDto.description;
      productEditDto.metaDescription = productDto.metaDescription;
      productEditDto.price = productDto.price;
      productEditDto.summary = productDto.summary;
      productEditDto.isActive = productDto.isActive;
      productEditDto.typeId = productDto.typeId;
      productEditDto.inventoryId = productDto.inventoryId;
      productEditDto.offId ="00000000-0000-0000-0000-000000000000";
      this.subscription = this.productService.productEdit(productEditDto).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(environment.messages.off.offProductDeleteSuccess);
          this.productUpdate.emit(true)
        }
      })
    }
  }
  public productPictureGetThumbnail():void {
    this.productDtos?.forEach(x => {
      this.productPictureGet(x.id.toString(), environment.role.product.thumbnail)
    })
  }
  public productPictureGet(productId: string, sort: number) :void {
    let productPictureSearchDto = new ProductPictureSearchDto();
    productPictureSearchDto.productId = productId;
    productPictureSearchDto.sort = sort;
    this.productPictureService.productPictureSetParam(productPictureSearchDto);
    this.productPictureService.productPictureGetAll().subscribe((res: ProductPictureDto[]) => {
      if (res) {
        this.productDtos?.forEach(productDto => {
          if (productDto?.id == res[0]?.productId) {
            productDto.productPictureDtos = [];
            productDto.productPictureDtos.push(res[0])
          }
        })
      }
    })
  }
  public ngOnChanges(changes: SimpleChanges): void {
    this.productPictureGetThumbnail();
  }
  setDataForProductItemMain(productId :string,typeId: string, productPicture: string) :void {
    localStorage.setItem(environment.storage.productIdForProductItemMain,productId);
    localStorage.setItem(environment.storage.typeIdForProductItemMain, typeId);
    localStorage.setItem(environment.storage.productPictureForProductItemMain, productPicture);
  }

  setDataForProductColorMain(productId :string, productPicture: string) :void {
    localStorage.setItem(environment.storage.productIdForProductColorMain,productId);
    localStorage.setItem(environment.storage.productPictureForProductColorMain, productPicture);
  }
  setProductId(id: string):void {
    localStorage.setItem(environment.storage.productIdForProductPictureMain,id);
  }
  public ngOnDestroy(): void {
    if (this.subscription)this.subscription.unsubscribe();
  }
}
