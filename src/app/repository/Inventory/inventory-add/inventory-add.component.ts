import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {InventoryService} from "../inventory-service/inventory.service";
import {InventoryAddDto} from "../../../shared/dto/inventory/inventoryAddDto";
import {StoreService} from "../../../store/store-service/store.service";
import {StoreUserService} from "../../../store-user/store-user-service/store-user.service";
import {environment} from "../../../../environments/environment.prod";
@Component({
  selector: 'inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss']
})

export class InventoryAddComponent implements OnInit , OnDestroy{

  public subscription:Subscription;
  public inventoryAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
  })
  constructor(private inventoryService: InventoryService,private storeService:StoreService, private toast: ToastrService,private router:Router) {}
  ngOnInit(): void {}
  inventoryAdd() {
    let inventoryAddDto: InventoryAddDto = this.inventoryAddForm.value;
    inventoryAddDto.storeId=localStorage.getItem(environment.storeId)
    this.subscription= this.inventoryService.inventoryAdd(inventoryAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(` انبار  با  موفقیت ثبت شد `);
        this.router.navigateByUrl("Repository/Inventory/InventoryMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
