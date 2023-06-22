import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {InventoryService} from "../inventory-service/inventory.service";
import {InventoryAddDto} from "../../../shared/dto/inventory/inventoryAddDto";
import {StoreService} from "../../../store/store-service/store.service";
import {environment} from "../../../../environments/environment.prod";
@Component({
  selector: 'inventory-add',
  templateUrl: './inventory-add.component.html',
  styleUrls: ['./inventory-add.component.scss']
})

export class InventoryAddComponent implements OnDestroy,AfterViewInit{

  public subscription:Subscription;
  public inventoryAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
  })
  constructor(private inventoryService: InventoryService,private storeService:StoreService, private toast: ToastrService,private router:Router,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-150+ "px");
  }
  inventoryAdd() {
    let inventoryAddDto: InventoryAddDto = this.inventoryAddForm.value;
    inventoryAddDto.storeId=localStorage.getItem(environment.storage.storeId)
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
