import {AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {StoreUserService} from "../../store-user-service/store-user.service";
import {Subscription} from "rxjs/internal/Subscription";
import {StoreUserPictureService} from "../store-user-picture-service/store-user-picture.service";
import {environment} from "../../../../environments/environment.prod";
@Component({
  selector: 'app-store-user-picture-add',
  templateUrl: './store-user-picture-add.component.html',
  styleUrls: ['./store-user-picture-add.component.scss']
})
export class StoreUserPictureAddComponent implements AfterViewInit{
  public typePictureAddForm=new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null , [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  public subscription:Subscription;
  constructor(private activatedRoute: ActivatedRoute,private storeUserService:StoreUserService,private storeUserPictureService:StoreUserPictureService
              ,private ef:ElementRef,private toastService:ToastrService,private router:Router,private renderer: Renderer2) {
    this.typePictureAddForm.addValidators(this.PictureMaxSize());
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-150+ "px");
  }

  public PictureMaxSize() {
    return () => {
      let picture: HTMLInputElement = this.ef.nativeElement.getElementsByClassName('file')[0];
      if (picture?.files[0]?.size > Number(environment.setting.picture.pictureMaxSize)) {
        return {pictureMaxSize: "عکس ها نمیتوانند بیشتر از " + environment.setting.picture.pictureMaxSizeShow + "kb باشند"}
      }
      return null;
    };
  }
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
    formData.append('storeId', localStorage.getItem(environment.storage.storeId));
    this.storeUserPictureService.storeUserPictureAdd(formData).subscribe((res:boolean)=>{
      if (res==true){
        this.toastService.success(`عکس باموفقیت اپلود شد. `);
       this.router.navigateByUrl("StoreUser/StoreUserPicture/StoreUserPictureMain")
      }
    })
  }
}
