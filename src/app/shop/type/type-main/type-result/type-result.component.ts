import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {TypeDto} from "../../../../shared/dto/type/typeDto";
import {Subscription} from "rxjs/internal/Subscription";
import {TypeService} from "../../type-service/type.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../../environments/environment";
@Component({
  selector: 'type-result',
  templateUrl: './type-result.component.html',
  styleUrls: ['./type-result.component.scss']
})
export class TypeResultComponent implements OnDestroy{
  @Input("typesDto") typesDto:TypeDto[];
  @Output() typeUpdate=new EventEmitter<boolean>();
  public subscription:Subscription;
  constructor(private typeService:TypeService, private toastService: ToastrService) {}
  typeDelete(id: number) {
    if(confirm(environment.messages.type.doYouWantDeleteType)){
      this.subscription=  this.typeService.typeDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(environment.messages.type.typeDeleteSuccess)
          this.typeUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
