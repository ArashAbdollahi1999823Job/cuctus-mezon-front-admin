import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';
import {ToastrService} from "ngx-toastr";

import {Subscription} from "rxjs/internal/Subscription";
import {InventoryOperationDto} from "../../../../shared/dto/inventoryOperation/inventoryOperationDto";
import {InventoryOperationService} from "../../inventory-operation-service/inventory-operation.service";
@Component({
  selector: 'inventory-operation-result',
  templateUrl: './inventory-operation-result.component.html',
  styleUrls: ['./inventory-operation-result.component.scss']
})
export class InventoryOperationResultComponent implements OnDestroy,AfterViewInit {
  @Input("inventoryOperationsDto") inventoryOperationsDto:InventoryOperationDto[];
  public subscription:Subscription;
  @Output() inventoryOperationUpdate=new EventEmitter<boolean>();
  constructor(private inventoryOperationService:InventoryOperationService, private toastService: ToastrService,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-250+ "px");
  }
  inventoryOperationDelete(id: string) {
    if(confirm("ایا از گزارش مغازه مطمعن هستید؟")){
      this.subscription=  this.inventoryOperationService.inventoryOperationDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`گزارش با موفقیت حذف شد.`)
          this.inventoryOperationUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
