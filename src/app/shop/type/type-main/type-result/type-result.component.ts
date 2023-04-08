import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {TypeDto} from "../../../../shared/dto/type/typeDto";
import {Subscription} from "rxjs/internal/Subscription";
import {TypeService} from "../../type-service/type.service";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'type-result',
  templateUrl: './type-result.component.html',
  styleUrls: ['./type-result.component.scss']
})
export class TypeResultComponent implements OnDestroy{
  @Input("types") Types:TypeDto[];
  @Output() typeUpdate=new EventEmitter<boolean>();
  public subscription:Subscription;
  constructor(private typeService:TypeService, private toastService: ToastrService) {}
  typeDelete(id: number) {
    if(confirm("ایا از حذف دسته مطمعن هستید؟")){
      this.subscription=  this.typeService.typeDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`دسته با موفقیت حذف شد.`)
          this.typeUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
