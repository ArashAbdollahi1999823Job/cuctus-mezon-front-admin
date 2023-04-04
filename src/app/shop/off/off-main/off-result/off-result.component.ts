import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {OffDto} from "../../../../shared/dto/off/offDto";
import {OffService} from "../../off-service/off.service";
@Component({
  selector: 'off-result',
  templateUrl: './off-result.component.html',
  styleUrls: ['./off-result.component.scss']
})
export class OffResultComponent implements OnDestroy{
  @Input("offsDto") offsDto:OffDto[];
  @Output() offUpdate=new EventEmitter<boolean>();
  public subscription:Subscription;
  constructor(private offService:OffService, private toastService: ToastrService) {}
  offDelete(id: number) {
    if(confirm("ایا از حذف تخفیف مطمعن هستید؟")){
      this.subscription=  this.offService.offDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`تخفیف با موفقیت حذف شد.`)
          this.offUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
