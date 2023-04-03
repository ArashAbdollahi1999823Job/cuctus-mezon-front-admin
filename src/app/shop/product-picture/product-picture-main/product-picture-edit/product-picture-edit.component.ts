import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {ProductPictureDto} from "../../../../shared/dto/productPicture/productPictureDto";
import {ProductPictureService} from "../../product-picture-service/product-picture.service";
import {ProductPictureEditDto} from "../../../../shared/dto/productPicture/productPictureEditDto";
@Component({
  selector: 'product-picture-edit',
  templateUrl: './product-picture-edit.component.html',
  styleUrls: ['./product-picture-edit.component.scss']
})
export class ProductPictureEditComponent implements OnInit{
  public productPicturesDto:ProductPictureDto;
  public productPictureId:string;
  public subscription:Subscription;
  public backendUrlPicture = environment.backendUrlPicture;

  public productPictureEditForm=new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null , [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    isActive: new FormControl(null),
  });
  constructor(private productPictureService: ProductPictureService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.productPictureId = this.activatedRoute.snapshot.paramMap.get('ProductPictureId');
    this.productPictureGetById(this.productPictureId)
  }
  public productPictureGetById(id: string) {
    this.subscription= this.productPictureService.productPictureGetById(id).subscribe((res:ProductPictureDto[]) => {
      this.productPicturesDto = res[0];
      this.productPicturesDto.pictureUrl=this.backendUrlPicture+"/"+res[0].pictureUrl
      this.title.setTitle("در حال اپدیت عکس" +res[0].pictureTitle  + " هستید ");

      this.productPictureEditForm.controls["pictureAlt"].setValue(this.productPicturesDto.pictureAlt);
      this.productPictureEditForm.controls["pictureTitle"].setValue(this.productPicturesDto.pictureTitle);
      this.productPictureEditForm.controls["sort"].setValue(this.productPicturesDto.sort.toString());
      this.productPictureEditForm.controls["isActive"].setValue(this.productPicturesDto.isActive);
    })
  }
  productPictureEdit() {
    let productPictureEditDto=new ProductPictureEditDto();
    productPictureEditDto.id =this.productPictureId;
    productPictureEditDto.pictureTitle= this.productPictureEditForm.controls['pictureTitle'].value;
    productPictureEditDto.pictureAlt= this.productPictureEditForm.controls['pictureAlt'].value;
    productPictureEditDto.sort=this.productPictureEditForm.controls["sort"].value;
    productPictureEditDto.isActive= this.productPictureEditForm.controls['isActive'].value;
    this.subscription= this.productPictureService.productPictureEdit(productPictureEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` عکس محصول باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("/ProductPicture/"+this.productPictureService.getProductId()+"/ProductPictureMain")
      }
    })
  }
}
