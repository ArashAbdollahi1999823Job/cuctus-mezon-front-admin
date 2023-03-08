import {Component, OnDestroy} from '@angular/core';
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {Subscription} from "rxjs";
import {TypeDto} from "../../../../shared/dto/Type/typeDto";
import {TypeService} from "../../type-service/type.service";
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'type-main',
  templateUrl: './type-main.component.html',
  styleUrls: ['./type-main.component.scss']
})
export class TypeMainComponent implements OnDestroy{
  public paginationType:PaginationDto<TypeDto>;
  public subscription:Subscription;
  constructor(private typeService:TypeService,private title:Title) {}
  ngOnInit(): void {
    this.typeGetAll();
    this.title.setTitle("مدیریت دسته فروشگاه بزرگ کاکتوس.")
  }
  public typeGetAll(){
    this.subscription= this.typeService.typeGetAll().subscribe((res:PaginationDto<TypeDto>)=>{
      this.paginationType=res;
    });
  }
  public typeUpdate(updated: boolean) {
    if (updated) this.typeGetAll();
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
