import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";
import {StoreUserPictureDto} from "../../../../shared/dto/storeUserPicture/storeUserPictureDto";
import {StoreUserPictureService} from "../../store-user-picture-service/store-user-picture.service";
import {StoreUserPictureParamDto} from "../../../../shared/dto/storeUserPicture/storeUserPictureParamDto";
import {StoreService} from "../../../../store/store-service/store.service";
@Component({
  selector: 'app-store-user-picture-main',
  templateUrl: './store-user-picture-main.component.html',
  styleUrls: ['./store-user-picture-main.component.scss']
})
export class StoreUserPictureMainComponent implements AfterViewInit {
  public storeUserPicturesDto:StoreUserPictureDto[]|undefined;
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  public subscription:Subscription;
  public storeUserPictureParamDto=new StoreUserPictureParamDto();
  constructor(private storeUserPictureService:StoreUserPictureService,private toastService: ToastrService,private storeService:StoreService,private ef:ElementRef,private renderer: Renderer2) {}
  ngOnInit(): void {
    this.storeUserPictureGetAll();
    this.storeUserPictureParamDto=this.storeUserPictureService.storeUserPictureGetParam();
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-150+ "px");
  }
  public storeUserPictureGetAll(){
    this.storeUserPictureParamDto.storeId=localStorage.getItem(environment.storage.storeId);
    this.storeUserPictureService.storeUserPictureSetParam(this.storeUserPictureParamDto);
    this.subscription= this.storeUserPictureService.storeUserPictureGetAll().subscribe((res:StoreUserPictureDto[])=>{
      this.storeUserPicturesDto=res;
    });
  }

  storeUserPictureDelete(id: string) {
    if(confirm("ایا از حذف فیزیکی عکس مغازه مطمعن هستید؟")){
      this.subscription= this.storeUserPictureService.storeUserPictureDelete(id).subscribe((res:boolean)=>{
        if(res==true){
          this.toastService.success(`عکس مغازه با موفقیت حذف شد.`)
          this.storeUserPictureGetAll();
        }
      })
    }
  }

  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
