import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {InventoryDto} from "../../../../shared/dto/inventory/inventoryDto";
import {InventoryService} from "../../inventory-service/inventory.service";
@Component({
  selector: 'inventory-result',
  templateUrl: './inventory-result.component.html',
  styleUrls: ['./inventory-result.component.scss']
})
export class InventoryResultComponent implements OnDestroy,AfterViewInit{
  @Input("inventoriesDto") inventoriesDto:InventoryDto[];
  @Output() inventoryUpdate=new EventEmitter<boolean>();
  public subscription:Subscription;
  constructor(private inventoryService:InventoryService, private toastService: ToastrService,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-190+ "px");
  }
  inventoryDelete(id: string) {
    if(confirm("ایا از حذف انبار مطمعن هستید؟")){
      this.subscription=  this.inventoryService.inventoryDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`انبار با موفقیت حذف شد.`)
          this.inventoryUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
