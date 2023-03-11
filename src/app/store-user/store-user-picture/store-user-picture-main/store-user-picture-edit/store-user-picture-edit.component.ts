import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {StoreUserPictureDto} from "../../../../shared/dto/storeUserPicture/storeUserPictureDto";
import {StoreUserPictureService} from "../../store-user-picture-service/store-user-picture.service";
import {StoreUserPictureEditDto} from "../../../../shared/dto/storeUserPicture/storeUserPictureEditDto";
@Component({
  selector: 'store-user-picture-edit',
  templateUrl: './store-user-picture-edit.component.html',
  styleUrls: ['./store-user-picture-edit.component.scss']
})
export class StoreUserPictureEditComponent implements OnInit{
  public storeUserPicturesDto:StoreUserPictureDto;
  public storeUserPictureId:string;
  public subscription:Subscription;
  public backendUrlPicture = environment.backendUrlPicture;

  public storeUserPictureEditForm=new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null , [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    isActive: new FormControl(null),
  });
  constructor(private storeUserPictureService: StoreUserPictureService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.storeUserPictureId = this.activatedRoute.snapshot.paramMap.get('StoreUserPictureId');
    this.storeUserPictureGetById(this.storeUserPictureId)
  }
  public storeUserPictureGetById(id: string) {
    this.subscription= this.storeUserPictureService.storeUserPictureGetById(id).subscribe((res:StoreUserPictureDto[]) => {
      this.storeUserPicturesDto = res[0];
      this.storeUserPicturesDto.pictureUrl=this.backendUrlPicture+"/"+res[0].pictureUrl
      this.title.setTitle("در حال اپدیت مغازه" +res[0].pictureTitle  + " هستید ");

      this.storeUserPictureEditForm.controls["pictureAlt"].setValue(this.storeUserPicturesDto.pictureAlt);
      this.storeUserPictureEditForm.controls["pictureTitle"].setValue(this.storeUserPicturesDto.pictureTitle);
      this.storeUserPictureEditForm.controls["sort"].setValue(this.storeUserPicturesDto.sort.toString());
      this.storeUserPictureEditForm.controls["isActive"].setValue(this.storeUserPicturesDto.isActive);
    })
  }
  typePictureEdit() {
    let storeUserPictureEditDto=new StoreUserPictureEditDto();
    storeUserPictureEditDto.id =this.storeUserPictureId;
    storeUserPictureEditDto.pictureTitle= this.storeUserPictureEditForm.controls['pictureTitle'].value;
    storeUserPictureEditDto.pictureAlt= this.storeUserPictureEditForm.controls['pictureAlt'].value;
    storeUserPictureEditDto.sort=this.storeUserPictureEditForm.controls["sort"].value;
    storeUserPictureEditDto.isActive= this.storeUserPictureEditForm.controls['isActive'].value;
    this.subscription= this.storeUserPictureService.storeUserPictureEdit(storeUserPictureEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` عکس مغازه باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("StoreUser/StoreUserPicture/StoreUserPictureMain")
      }
    })
  }
}
