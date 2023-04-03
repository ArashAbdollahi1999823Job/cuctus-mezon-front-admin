import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {ProductDto} from "../../../../shared/dto/product/productDto";
import {TypeService} from "../../../type/type-service/type.service";
import {ProductService} from "../../product-service/product.service";
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
}
