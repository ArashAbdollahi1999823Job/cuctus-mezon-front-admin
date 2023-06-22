import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {BrandDto} from "../../../../shared/dto/brand/brandDto";
import {BrandService} from "../../brand-service/brand.service";
@Component({
  selector: 'brand-result',
  templateUrl: './brand-result.component.html',
  styleUrls: ['./brand-result.component.scss']
})
export class BrandResultComponent implements OnDestroy,AfterViewInit{
  @Input("brandsDto") brandsDto:BrandDto[];
  @Output() brandUpdate=new EventEmitter<boolean>();
  public subscription:Subscription;
  constructor(private brandService:BrandService, private toastService: ToastrService,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-250+ "px");
  }
  brandDelete(id: string) {
    if(confirm("ایا از حذف برند مطمعن هستید؟")){
      this.subscription=  this.brandService.brandDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`برند با موفقیت حذف شد.`)
          this.brandUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
