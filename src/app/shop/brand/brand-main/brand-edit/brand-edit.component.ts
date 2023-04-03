import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {Subscription} from "rxjs/internal/Subscription";
import {BrandService} from "../../brand-service/brand.service";
import {BrandDto} from "../../../../shared/dto/brand/brandDto";
import {BrandEditDto} from "../../../../shared/dto/brand/brandEditDto";
@Component({
  selector: 'brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.scss']
})
export class BrandEditComponent implements OnDestroy {
  public brandId: string;
  public subscription:Subscription;
  public typeEditForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    summary: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
  })
  public brandDto: BrandDto;
  constructor(private brandService: BrandService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.brandId = this.activatedRoute.snapshot.paramMap.get('BrandId');
    this.brandGetById(this.brandId);
  }
  public brandGetById(id: string) {
    this.subscription= this.brandService.brandGetById(id).subscribe((res:PaginationDto<BrandDto>) => {
      this.brandDto = res.data[0];
      this.title.setTitle("در حال اپدیت مغازه" +res.data[0].name  + " هستید ");
      this.typeEditForm.controls["name"].setValue(this.brandDto.name);
      this.typeEditForm.controls["description"].setValue(this.brandDto.description);
      this.typeEditForm.controls["metaDescription"].setValue(this.brandDto.metaDescription);
      this.typeEditForm.controls["summary"].setValue(this.brandDto.summary);

    })
  }
  brandEdit() {
    let brandEditDto=new BrandEditDto();
    brandEditDto.id =this.brandId;
    brandEditDto.name= this.typeEditForm.controls['name'].value;
    brandEditDto.description= this.typeEditForm.controls['description'].value;
    brandEditDto.metaDescription=this.typeEditForm.controls["metaDescription"].value;
    brandEditDto.summary= this.typeEditForm.controls['summary'].value;
    this.subscription= this.brandService.brandEdit(brandEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` برند باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("Brand/BrandMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
