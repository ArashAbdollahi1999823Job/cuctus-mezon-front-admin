import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {BrandAddDto} from "../../../shared/dto/brand/brandAddDto";
import {BrandService} from "../brand-service/brand.service";
@Component({
  selector: 'brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss']
})

export class BrandAddComponent implements OnInit , OnDestroy{
  public subscription:Subscription;
  public brandAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    summary: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
  })
  constructor(private brandService: BrandService, private toast: ToastrService,private router:Router) {}
  ngOnInit(): void {}
  brandAdd() {
    let brandAddDto: BrandAddDto = this.brandAddForm.value;
    this.subscription= this.brandService.brandAdd(brandAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(`برند  با  موفقیت ثبت شد `);
        this.router.navigateByUrl("Brand/BrandMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
