import {Component, OnInit} from '@angular/core';
import {OffDto} from "../../../../shared/dto/off/offDto";
import {OffService} from "../../../off/off-service/off.service";
import {ProductService} from "../../product-service/product.service";
import {OffParamDto} from "../../../../shared/dto/off/offParamDto";
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {ProductDto} from "../../../../shared/dto/product/productDto";
import {ProductSearchDto} from "../../../../shared/dto/product/productSearchDto";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {ProductEditDto} from "../../../../shared/dto/product/ProductEditDto";

@Component({
  selector: 'product-add-off',
  templateUrl: './product-add-off.component.html',
  styleUrls: ['./product-add-off.component.scss']
})
export class ProductAddOffComponent implements OnInit {

  public productId: string;
  public offsDto: OffDto[];
  public offParamDto: OffParamDto;
  public subscription: Subscription;
  public productDto: ProductDto;
  public productParamDto: ProductSearchDto;

  constructor(private offService: OffService, private productService: ProductService, private activatedRoute: ActivatedRoute, private title: Title, private toastService: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.offParamDto = this.offService.offGetParam();
    this.offGet();
    this.productId = this.activatedRoute.snapshot.paramMap.get('ProductId');
    this.productService.productSearchDtoSet(this.productParamDto);
    this.subscription = this.productService.productGetById(this.productId).subscribe((res: PaginationDto<ProductDto>) => {
      if (res) {
        this.productDto = res.data[0];
      }
    })

  }

  public offGet() {
    this.offParamDto.storeId = localStorage.getItem('storeId');
    this.offService.offSetParam(this.offParamDto);
    this.subscription = this.offService.offGetAll().subscribe((res: OffDto[]) => {
      this.offsDto = res;
    })
  }


  productAddOff(offId: string) {
    var productEditDto=new ProductEditDto();
    productEditDto.id=this.productDto.id.toString();
    productEditDto.name=this.productDto.name;
    productEditDto.slug=this.productDto.slug;
    productEditDto.description=this.productDto.description;
    productEditDto.metaDescription=this.productDto.metaDescription;
    productEditDto.price=this.productDto.price;
    productEditDto.summary=this.productDto.summary;
    productEditDto.isActive=this.productDto.isActive;
    productEditDto.typeId=this.productDto.typeId;
    productEditDto.inventoryId=this.productDto.inventoryId;
    productEditDto.offId=offId;
    this.subscription=this.productService.productEdit(productEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` تخفیف محصول باموفقیت اعمال شد.`);
        this.router.navigateByUrl("/Product/ProductMain")
      }
    })
  }
}
