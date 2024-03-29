import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {InventoryOperationService} from "../inventory-operation-service/inventory-operation.service";
import {Title} from "@angular/platform-browser";
import {InventoryOperationAddDto} from "../../../shared/dto/inventoryOperation/inventoryOperationAddDto";
@Component({
  selector: 'inventory-operation-add',
  templateUrl: './inventory-operation-add.component.html',
  styleUrls: ['./inventory-operation-add.component.scss']
})
export class InventoryOperationAddComponent implements OnInit,OnDestroy,AfterViewInit {
  constructor(private inventoryOperationService: InventoryOperationService, private toast: ToastrService,private router:Router, private activatedRoute: ActivatedRoute,private ef:ElementRef,private renderer: Renderer2) {}
  public productId:string;
  public subscription:Subscription;
  public inventoryOperationAddForm: FormGroup = new FormGroup({
    description: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    price: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    count: new FormControl(null, [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    inventoryOperationType: new FormControl(null,[Validators.required]),
  })
  inventoryOperationType=[
    {key:1,title:'افزودن'},
    {key:2,title:'کاهش'},
    {key:3,title:'فروش'},
    {key:4,title:'خرید'},
  ];
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('ProductId');
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-120+ "px");
  }
 public inventoryOperationAdd() {
    let inventoryOperationAddDto: InventoryOperationAddDto = this.inventoryOperationAddForm.value;
    inventoryOperationAddDto.productId=this.productId;
   this.subscription= this.inventoryOperationService.inventoryOperationAdd(inventoryOperationAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(`گزارش با موفقیت ثبت شد`);
        this.router.navigateByUrl("/Product/ProductMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
