import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeDto} from "../../../../shared/dto/Type/typeDto";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {Subscription} from "rxjs/internal/Subscription";
import {InventoryParamDto} from "../../../../shared/dto/inventory/inventoryParamDto";
import {InventoryDto} from "../../../../shared/dto/inventory/inventoryDto";
import {InventoryService} from "../../../../repository/Inventory/inventory-service/inventory.service";
import {TypeService} from "../../../type/type-service/type.service";
import {ProductDto} from "../../../../shared/dto/product/productDto";
import {ProductService} from "../../product-service/product.service";
import {ProductEditDto} from "../../../../shared/dto/product/ProductEditDto";
@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnDestroy,OnInit {
  public inventoryParamDto:InventoryParamDto;
  public typesDto: TypeDto[];
  public inventoriesDto: InventoryDto[];
  public subscription: Subscription;
  public productId: string;
  public productEditForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    slug: new FormControl(null, [Validators.required, Validators.maxLength(60), Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(1)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    summary: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    inventoryId: new FormControl(null, [Validators.required]),
    typeId: new FormControl(null, [Validators.required]),
    isActive: new FormControl(),
  })
  public productDto: ProductDto;
  constructor(private typeService: TypeService, private activatedRoute: ActivatedRoute, private title: Title,
              private toastService:ToastrService,private router:Router,private inventoryService:InventoryService,private productService:ProductService) {}
  ngOnInit(): void {
    this.inventoryParamDto=this.inventoryService.inventoryGetParam();
    this.productId = this.activatedRoute.snapshot.paramMap.get('ProductId');
    this.typeGet();
    this.productGetById(this.productId);
    this.inventoryGet();

  }
  inventoryGet() {
    this.inventoryParamDto.storeId=localStorage.getItem('storeId');
    this.inventoryService.inventorySetParam(this.inventoryParamDto);
    this.subscription = this.inventoryService.inventoryGetAll().subscribe((res: InventoryDto[]) => {
      this.inventoriesDto = res;
    })
  }
  public productGetById(id: string) {
    this.subscription= this.productService.productGetById(id).subscribe((res:PaginationDto<ProductDto>) => {
      this.productDto = res.data[0];
      this.title.setTitle("در حال اپدیت مغازه" +res.data[0].name  + " هستید ");
      this.productEditForm.controls["name"].setValue(this.productDto.name);
      this.productEditForm.controls["slug"].setValue(this.productDto.slug);
      this.productEditForm.controls["price"].setValue(this.productDto.price);
      this.productEditForm.controls["description"].setValue(this.productDto.description);
      this.productEditForm.controls["metaDescription"].setValue(this.productDto.metaDescription);
      this.productEditForm.controls["summary"].setValue(this.productDto.summary);
      this.productEditForm.controls["typeId"].setValue(this.productDto.typeId);
      this.productEditForm.controls["inventoryId"].setValue(this.productDto.inventoryId);
      this.productEditForm.controls["isActive"].setValue(this.productDto.isActive);
    })
  }
  typeGet() {
    this.subscription=  this.typeService.typeGet().subscribe((res:PaginationDto<TypeDto>) => {
      this.typesDto = res.data;
    });
  }
  productEdit() {
    let productEditDto=new ProductEditDto();
    productEditDto.id =this.productId;
    productEditDto.name= this.productEditForm.controls['name'].value;
    productEditDto.slug= this.productEditForm.controls['slug'].value;
    productEditDto.price= this.productEditForm.controls['price'].value;
    productEditDto.description= this.productEditForm.controls['description'].value;
    productEditDto.metaDescription=this.productEditForm.controls["metaDescription"].value;
    productEditDto.summary= this.productEditForm.controls['summary'].value;
    productEditDto.typeId= this.productEditForm.controls['typeId'].value;
    productEditDto.inventoryId= this.productEditForm.controls['inventoryId'].value;
    productEditDto.isActive= this.productEditForm.controls['isActive'].value;
    this.subscription= this.productService.productEdit(productEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` محصول باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("Product/ProductMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }

  slugify() {

  }
}
