import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
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
export class ProductResultComponent implements OnDestroy, OnChanges {
  @Input("productDtos") productDtos: ProductDto[];
  public backendUrlPicture = environment.backendUrlPicture;
  @Output() productUpdate = new EventEmitter<boolean>();
  public subscription: Subscription;

  constructor(private productService: ProductService, private toastService: ToastrService, private productPictureService: ProductPictureService) {
  }

  public productDelete(id: number) {
    if (confirm("ایا از حذف محصول مطمعن هستید؟")) {
      this.subscription = this.productService.productDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`محصول با موفقیت حذف شد.`)
          this.productUpdate.emit(true)
        }
      })
    }
  }

  public productOffDelete(id: number) {
    if (confirm("ایا از کنسل تخفیف  مطمعن هستید؟")) {
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
      productEditDto.offId = 0;
      this.subscription = this.productService.productEdit(productEditDto).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(` تخفیف محصول باموفقیت حذف شد.`);
          this.productUpdate.emit(true)
        }
      })
    }
  }

  public productPictureGetThumbnail() {
    this.productDtos?.forEach(x => {
      this.productPictureGet(x.id.toString(), environment.productSetting.thumbnail)
    })
  }

  public productPictureGet(productId: string, sort: number) {
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

  setData(typeId: number, productPicture: string) {
    localStorage.setItem(environment.typeId, typeId.toString())
    localStorage.setItem(environment.productPicture, productPicture)
  }
  setProductId(id: number) {
    localStorage.setItem(environment.productIdForProductPictureMain,id.toString());
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
