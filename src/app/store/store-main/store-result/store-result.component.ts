import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {StoreDto} from "../../../shared/dto/store/storeDto";
import {StoreService} from "../../store-service/store.service";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'store-result',
  templateUrl: './store-result.component.html',
  styleUrls: ['./store-result.component.scss']
})
export class StoreResultComponent implements OnDestroy,AfterViewInit {
  @Input("storesDto") storesDto:StoreDto[];
  public subscription:Subscription;
  @Output() storeUpdate=new EventEmitter<boolean>();
  constructor(private storeService:StoreService, private toastService: ToastrService,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-250+ "px");
  }
  storeDelete(id: string) {
    if(confirm("ایا از حذف مغازه مطمعن هستید؟")){
      this.subscription=  this.storeService.storeDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`مغازه با موفقیت حذف شد.`)
          this.storeUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
