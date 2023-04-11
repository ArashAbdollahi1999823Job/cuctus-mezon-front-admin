import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {TypeDto} from "../../../shared/dto/type/typeDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeService} from "../../type/type-service/type.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {InventoryDto} from "../../../shared/dto/inventory/inventoryDto";
import {InventoryService} from "../../../repository/Inventory/inventory-service/inventory.service";
import {slugify} from "../../../shared/tool/slugify";
import {ProductAddDto} from "../../../shared/dto/product/productAddDto";
import {ProductService} from "../product-service/product.service";
import {InventoryParamDto} from "../../../shared/dto/inventory/inventoryParamDto";

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit, OnDestroy {
  public inventoryParamDto:InventoryParamDto;
  public typesDto: TypeDto[];
  public inventoriesDto: InventoryDto[];
  public subscription: Subscription;
  public productAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    slug: new FormControl(null, [Validators.required, Validators.maxLength(60), Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(1)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    summary: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    inventoryId: new FormControl(null, [Validators.required]),
    typeId: new FormControl(null, [Validators.required]),
  })
  constructor(private typeService: TypeService, private toast: ToastrService, private router: Router, private inventoryService: InventoryService,private productService:ProductService) {}
  ngOnInit(): void {
    this.inventoryParamDto=this.inventoryService.inventoryGetParam();
    this.typeGet();
    this.inventoryGet();

  }
  typeGet() {
    this.subscription = this.typeService.typeGet().subscribe((res: PaginationDto<TypeDto>) => {
      this.typesDto = res.data;
    });
  }
  inventoryGet() {
    this.inventoryParamDto.storeId=localStorage.getItem('storeId');
    this.inventoryService.inventorySetParam(this.inventoryParamDto);
    this.subscription = this.inventoryService.inventoryGetAll().subscribe((res: InventoryDto[]) => {
      this.inventoriesDto = res;
    })
  }
  typeAdd() {
    let productAddDto: ProductAddDto = this.productAddForm.value;
    this.subscription = this.productService.productAdd(productAddDto).subscribe((res: boolean) => {
      if (res == true) {
        this.toast.success(` محصول  با  موفقیت ثبت شد `);
        this.router.navigateByUrl("Product/ProductMain")
      }
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  slugify() {
    this.productAddForm.controls['slug'].setValue(slugify(this.productAddForm.controls['name'].value+"-"+Math.floor((Math.random() * 1000) + 1)));
  }
}
