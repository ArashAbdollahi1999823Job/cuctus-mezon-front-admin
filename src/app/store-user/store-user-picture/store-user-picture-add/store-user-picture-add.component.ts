import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {StoreUserService} from "../../store-user-service/store-user.service";
import {Subscription} from "rxjs/internal/Subscription";
import {StoreUserDto} from "../../../shared/dto/storeUser/storeUserDto";
import {StoreUserPictureService} from "../store-user-picture-service/store-user-picture.service";
import {environment} from "../../../../environments/environment.prod";
@Component({
  selector: 'app-store-user-picture-add',
  templateUrl: './store-user-picture-add.component.html',
  styleUrls: ['./store-user-picture-add.component.scss']
})
export class StoreUserPictureAddComponent {
  public typePictureAddForm=new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null , [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('')
  });
  public subscription:Subscription;
  constructor(private activatedRoute: ActivatedRoute,private storeUserService:StoreUserService,private storeUserPictureService:StoreUserPictureService,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {}
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.typePictureAddForm.patchValue({
        fileSource: file,
      })
    }
  }
  public typePictureAdd () {
    const formData = new FormData();
    formData.append('pictureUrl', this.typePictureAddForm.get("fileSource").value);
    formData.append('pictureAlt', this.typePictureAddForm.get("pictureAlt").value);
    formData.append('pictureTitle', this.typePictureAddForm.get("pictureTitle").value);
    formData.append('sort', this.typePictureAddForm.get("sort").value);
    formData.append('storeId', localStorage.getItem(environment.storeId));
    this.storeUserPictureService.storeUserPictureAdd(formData).subscribe((res:boolean)=>{
      if (res==true){
        this.toastService.success(`عکس باموفقیت اپلود شد. `);
       this.router.navigateByUrl("StoreUser/StoreUserPicture/StoreUserPictureMain")
      }
    })
  }
}
