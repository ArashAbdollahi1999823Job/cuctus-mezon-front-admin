import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductPictureService} from "../product-picture-service/product-picture.service";
import {environment} from "../../../../environments/environment";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'product-picture-add',
  templateUrl: './product-picture-add.component.html',
  styleUrls: ['./product-picture-add.component.scss']
})
export class ProductPictureAddComponent implements OnDestroy{
  private subscription:Subscription;
  public productPictureAddForm=new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null , [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('')
  });
  constructor(private activatedRoute: ActivatedRoute,private productPictureService:ProductPictureService,private toastService:ToastrService,private router:Router) {}
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productPictureAddForm.patchValue({
        fileSource: file,
      })
    }
  }
  public productPictureAdd () {
    const formData = new FormData();
    formData.append('pictureUrl', this.productPictureAddForm.get("fileSource").value);
    formData.append('pictureAlt', this.productPictureAddForm.get("pictureAlt").value);
    formData.append('pictureTitle', this.productPictureAddForm.get("pictureTitle").value);
    formData.append('sort', this.productPictureAddForm.get("sort").value);
    formData.append('productId', localStorage.getItem(environment.productIdForProductPictureMain));
   this.subscription= this.productPictureService.productPictureAdd(formData).subscribe((res:boolean)=>{
      if (res==true){
        this.toastService.success(environment.messages.productPicture.productPictureAddSuccess);
        this.router.navigateByUrl("/ProductPicture/ProductPictureMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}

