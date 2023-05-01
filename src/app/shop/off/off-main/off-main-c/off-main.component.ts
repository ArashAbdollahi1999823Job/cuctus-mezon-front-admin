import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../../environments/environment";
import {OffDto} from "../../../../shared/dto/off/offDto";
import {OffParamDto} from "../../../../shared/dto/off/offParamDto";
import {OffService} from "../../off-service/off.service";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'off-main',
  templateUrl: './off-main.component.html',
  styleUrls: ['./off-main.component.scss']
})
export class OffMainComponent implements OnDestroy{
  public offDtos:OffDto[];
  public subscription:Subscription;
  public intervalChangeTime:any;
  constructor(private offService:OffService,private title:Title,private toastService:ToastrService) {}
  ngOnInit(): void {
    this.offGetAll();
    this.title.setTitle("مدیریت تخفیف فروشگاه بزرگ کاکتوس.");
      this.intervalChangeTime=  setInterval(()=>{
        this.offDtos?.forEach(x=>{
          this.timer(x.id)
        })
      },1000)
  }
  public offGetAll(){
    let offSearchDto=new OffParamDto();
    offSearchDto.storeId=localStorage.getItem(environment.storeId);
    this.offService.offSetParam(offSearchDto);
    this.subscription= this.offService.offGetAll().subscribe((res:OffDto[])=>{
      this.offDtos=res;
    });
  }
  offDelete(id: string) {
    if(confirm(environment.messages.off.offDoYouWantDelete)){
      this.subscription=  this.offService.offDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(environment.messages.off.offDeleteSuccess)
          this.offGetAll();
        }
      })
    }
  }
  timer(id:string) {
    let end = new Date(this.offDtos.find(x=>x.id==id).endDate)
    let now = new Date();
    let sec=
      ((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(),end.getHours(),end.getMinutes(),end.getSeconds())
        -Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds()))/ (1000) );
    const seconds = Math.floor(sec % 60);
    const minutes = Math.floor((sec % 3600) / 60);
    const hours = Math.floor((sec % (3600 * 24)) / 3600);
    const days = Math.floor(sec / (3600 * 24));
    let ele=document?.getElementById(id.toString());
    ele.innerText=`${days}:${hours}:${minutes}:${seconds}`;
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
    clearInterval(this.intervalChangeTime);
  }
}
