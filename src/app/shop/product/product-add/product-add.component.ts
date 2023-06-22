import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
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
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy,AfterViewInit {
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
  constructor(private typeService: TypeService, private toast: ToastrService, private router: Router, private inventoryService: InventoryService,private productService:ProductService,private ef:ElementRef,private renderer: Renderer2) {}
  ngOnInit(): void {
    this.typeGet();
    this.inventoryGet();
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-150+ "px");
  }
  typeGet() {
    this.subscription = this.typeService.typeGet().subscribe((res: PaginationDto<TypeDto>) => {
      this.typesDto = res.data;
    });
  }
  inventoryGet() {
    let inventorySearchDto=new InventoryParamDto();
    inventorySearchDto.storeId=localStorage.getItem(environment.storage.storeId);
    this.inventoryService.inventorySetParam(inventorySearchDto);
    this.subscription = this.inventoryService.inventoryGetAll().subscribe((res: InventoryDto[]) => {
      this.inventoriesDto = res;
    })
  }
  typeAdd() {
    let productAddDto: ProductAddDto = this.productAddForm.value;
    this.subscription = this.productService.productAdd(productAddDto).subscribe((res: boolean) => {
      if (res == true) {
        this.toast.success(environment.messages.product.productAddSuccess);
        this.router.navigateByUrl("Product/ProductMain")
      }
    })
  }
  slugify() {
    this.productAddForm.controls['slug'].setValue(slugify(this.productAddForm.controls['name'].value+"-"+Math.floor((Math.random() * 1000) + 1)));
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
