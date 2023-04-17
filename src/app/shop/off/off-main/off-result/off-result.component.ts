import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {OffDto} from "../../../../shared/dto/off/offDto";
import {OffService} from "../../off-service/off.service";
import {environment} from "../../../../../environments/environment";
@Component({
  selector: 'off-result',
  templateUrl: './off-result.component.html',
  styleUrls: ['./off-result.component.scss']
})
export class OffResultComponent implements OnDestroy,OnInit{
  @Input("offsDto") offsDto:OffDto[];
  @Output() offUpdate=new EventEmitter<boolean>();
  public subscription:Subscription;
  public intervalChangeTime:any;

  constructor(private offService:OffService, private toastService: ToastrService) {}
  ngOnInit(): void {
    this.intervalChangeTime=  setInterval(()=>{
      this.offsDto?.forEach(x=>{
        this.timer(x.id)
      })
    },1000)
  }
  offDelete(id: number) {
    if(confirm(environment.messages.off.doYouWantDeleteOff)){
      this.subscription=  this.offService.offDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(environment.messages.off.offDeleteSuccess)
          this.offUpdate.emit(true)
        }
      })
    }
  }
  timer(id:number) {
      let end = new Date(this.offsDto.find(x=>x.id==id).endDate)
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


