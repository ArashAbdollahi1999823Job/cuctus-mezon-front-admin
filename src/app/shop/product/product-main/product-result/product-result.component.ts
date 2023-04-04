import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {ProductDto} from "../../../../shared/dto/product/productDto";
import {ProductService} from "../../product-service/product.service";
import {ProductEditDto} from "../../../../shared/dto/product/ProductEditDto";
@Component({
  selector: 'product-result',
  templateUrl: './product-result.component.html',
  styleUrls: ['./product-result.component.scss']
})
export class ProductResultComponent implements OnDestroy{
  @Input("products") Products:ProductDto[];
  @Output() productUpdate=new EventEmitter<boolean>();
  public subscription:Subscription;
  constructor(private productService:ProductService, private toastService: ToastrService) {}
 productDelete(id: number) {
    if(confirm("ایا از حذف محصول مطمعن هستید؟")){
      this.subscription=  this.productService.productDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`محصول با موفقیت حذف شد.`)
          this.productUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }

  productOffDelete(id: number) {
    if (confirm("ایا از کنسل تخفیف  مطمعن هستید؟")) {
      var productDto = this.Products.find(x => x.id == id);
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
}
