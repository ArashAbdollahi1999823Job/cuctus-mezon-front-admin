import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class BusyService {
  //this value for save request count created
  private busyRequestCount=new BehaviorSubject<number>(0);
  constructor(private spinnerService:NgxSpinnerService){ }
  //this method calculate show process
  public show(){
    this.busyRequestCount.next(this.busyRequestCount.value+1);
    this.spinnerService.show(undefined,{bdColor:'rgba(0, 0, 0, 0.8)',color:'#fff',fullScreen:true,size:"large",type:"line-scale-pulse-out"});
  }
  //this method calculate hide process
  public hide(){
    this.busyRequestCount.next(this.busyRequestCount.value-1);
    if(this.busyRequestCount.value<=0){
      this.busyRequestCount.next(0);
      this.spinnerService.hide();
    }
  }
}
