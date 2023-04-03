import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductPictureService} from "../product-picture-service/product-picture.service";
@Component({
  selector: 'product-picture-add',
  templateUrl: './product-picture-add.component.html',
  styleUrls: ['./product-picture-add.component.scss']
})
export class ProductPictureAddComponent implements OnInit{
  public productPictureAddForm=new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null , [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('')
  });
  public productId: string;
  constructor(private activatedRoute: ActivatedRoute,private productPictureService:ProductPictureService,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {this.productId=this.productPictureService.getProductId()}
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
    formData.append('productId', this.productId);
    this.productPictureService.productPictureAdd(formData).subscribe((res:boolean)=>{
      if (res==true){
        this.toastService.success(`عکس باموفقیت اپلود شد. `);
        this.router.navigateByUrl("/ProductPicture/"+this.productId+"/ProductPictureMain")
      }
    })
  }
}

