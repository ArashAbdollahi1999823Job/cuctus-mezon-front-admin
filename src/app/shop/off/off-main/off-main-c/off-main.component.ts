import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment.prod";
import {OffDto} from "../../../../shared/dto/off/offDto";
import {OffParamDto} from "../../../../shared/dto/off/offParamDto";
import {OffService} from "../../off-service/off.service";

@Component({
  selector: 'off-main',
  templateUrl: './off-main.component.html',
  styleUrls: ['./off-main.component.scss']
})
export class OffMainComponent implements OnDestroy{
  public offDto:OffDto[];
  public subscription:Subscription;
  public offParamDto=new OffParamDto();
  constructor(private offService:OffService,private title:Title) {}
  ngOnInit(): void {
    this.offGetAll();
    this.title.setTitle("مدیریت تخفیف فروشگاه بزرگ کاکتوس.");
    this.offParamDto=this.offService.offGetParam();
  }
  public offGetAll(){
    this.offParamDto.storeId=localStorage.getItem(environment.storeId);
    this.offService.offSetParam(this.offParamDto);
    this.subscription= this.offService.offGetAll().subscribe((res:OffDto[])=>{
      this.offDto=res;
    });
  }
  public offUpdate(updated: boolean) {
    if (updated) this.offGetAll();
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
