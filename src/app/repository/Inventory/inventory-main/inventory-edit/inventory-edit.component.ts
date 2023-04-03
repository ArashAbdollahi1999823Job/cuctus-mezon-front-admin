import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";
import {InventoryDto} from "../../../../shared/dto/inventory/inventoryDto";
import {InventoryService} from "../../inventory-service/inventory.service";
import {InventoryEditDto} from "../../../../shared/dto/inventory/inventoryEditDto";
@Component({
  selector: 'inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.scss']
})
export class InventoryEditComponent implements OnDestroy {
  public id: string;
  public inventoryDto: InventoryDto;

  public subscription:Subscription;
  public typeEditForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    isActive: new FormControl(),
  })
  constructor(private inventoryService: InventoryService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.inventoryGetById(this.id);
  }
  public inventoryGetById(id: string) {
    this.subscription= this.inventoryService.inventoryGetById(id).subscribe((res:InventoryDto[]) => {
      this.inventoryDto = res[0];
      this.title.setTitle("در حال اپدیت انبار" +res[0].name  + " هستید ");
      this.typeEditForm.controls["name"].setValue(this.inventoryDto.name);
      this.typeEditForm.controls["isActive"].setValue(this.inventoryDto.isActive);

    })
  }
  inventoryEdit() {
    let inventoryEditDto=new InventoryEditDto();
    inventoryEditDto.id =this.id;
    inventoryEditDto.name= this.typeEditForm.controls['name'].value;
    inventoryEditDto.isActive= this.typeEditForm.controls['isActive'].value;
    this.subscription= this.inventoryService.inventoryEdit(inventoryEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` انبار باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("Repository/Inventory/InventoryMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
