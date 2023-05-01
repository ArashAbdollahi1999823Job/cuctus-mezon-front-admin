import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {ProductItemService} from "../product-item-service/product-item.service";
import {ProductItemAddDto} from "../../../shared/dto/productItem/productItemAddDto";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'product-item-add',
  templateUrl: './product-item-add.component.html',
  styleUrls: ['./product-item-add.component.scss']
})
export class ProductItemAddComponent implements OnInit, OnDestroy {
  public backendUrlPicture=environment.backendUrlPicture;
  public productPictureUrl:string;
  private subscription: Subscription;
  public productItemAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
    value: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(1)]),
  })
  constructor(private productItemService: ProductItemService, private toast: ToastrService, private router: Router) {
  }
  ngOnInit(): void {
    this.productPictureUrl=localStorage.getItem(environment.productPictureForProductItemMain)
    this.addName();
  }
  public productItemAdd() {
    let productItemAddDto: ProductItemAddDto = this.productItemAddForm.value;
    productItemAddDto.productId =localStorage.getItem(environment.productIdForProductItemMain);
    this.subscription = this.productItemService.productItemAdd(productItemAddDto).subscribe((res: boolean) => {
      if (res == true) {
        this.toast.success(environment.messages.productItem.productItemAddSuccess);
        this.router.navigateByUrl("ProductItem/ProductItemMain")
      }
    })
  }
  private addName() {
    let typeItemName = localStorage.getItem(environment.typeItemName);
    if (typeItemName != null) this.productItemAddForm.controls['name'].setValue(typeItemName);
  }
  ngOnDestroy(): void {
    if (this.subscription)this.subscription.unsubscribe()
    localStorage.removeItem(environment.typeItemName)
  }
}
