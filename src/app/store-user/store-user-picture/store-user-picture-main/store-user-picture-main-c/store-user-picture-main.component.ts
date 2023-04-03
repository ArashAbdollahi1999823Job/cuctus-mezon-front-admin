import { Component } from '@angular/core';
import {TypePictureDto} from "../../../../shared/dto/typePicture/typePictureDto";
import {environment} from "../../../../../environments/environment";
import {Subscription} from "rxjs/internal/Subscription";
import {TypePictureService} from "../../../../shop/type-picture/type-picture-service/type-picture.service";
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
export class StoreUserPictureMainComponent {
  public storeUserPicturesDto:StoreUserPictureDto[]|undefined;
  public backendUrlPicture = environment.backendUrlPicture;
  public subscription:Subscription;
  public storeUserPictureParamDto=new StoreUserPictureParamDto();
  constructor(private storeUserPictureService:StoreUserPictureService,private toastService: ToastrService,private storeService:StoreService) {}
  ngOnInit(): void {
    this.storeUserPictureGetAll();
    this.storeUserPictureParamDto=this.storeUserPictureService.storeUserPictureGetParam();
  }
  public storeUserPictureGetAll(){
    this.storeUserPictureParamDto.storeId=localStorage.getItem(environment.storeId);
    this.storeUserPictureService.storeUserPictureSetParam(this.storeUserPictureParamDto);
    this.subscription= this.storeUserPictureService.storeUserPictureGetAll().subscribe((res:StoreUserPictureDto[])=>{
      this.storeUserPicturesDto=res;
    });
  }

  storeUserPictureDelete(id: number) {
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
