import {Component, OnDestroy, OnInit} from '@angular/core';
import {slugify} from "../../../shared/tool/slugify";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TypeDto} from "../../../shared/dto/type/typeDto";
import {TypeService} from "../type-service/type.service";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {TypeAddDto} from "../../../shared/dto/type/typeAddDto";
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'type-add',
  templateUrl: './type-add.component.html',
  styleUrls: ['./type-add.component.scss']
})
export class TypeAddComponent implements OnInit , OnDestroy{
  public typeDtos:TypeDto[];
  public subscription:Subscription;
  public typeId;
  public typeAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    slug: new FormControl(null, [Validators.required, Validators.maxLength(60), Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    summary: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    parentTypeId: new FormControl(null, [Validators.required]),
  })
  constructor(private typeService: TypeService, private toast: ToastrService,private router:Router,private activatedRoute:ActivatedRoute) {}
  ngOnInit(): void {
    this.typeGetAll();
    this.typeId=this.activatedRoute.snapshot.paramMap.get('TypeId');
    if(this.typeId){
      this.typeAddForm.controls['parentTypeId'].setValue(this.typeId)}
  }
  typeGetAll() {
    this.subscription= this.typeService.typeGet().subscribe((res:PaginationDto<TypeDto>) => {
      this.typeDtos = res.data;
    });
  }
  typeAdd() {
    let typeAddDto: TypeAddDto = this.typeAddForm.value;
    this.subscription= this.typeService.typeAdd(typeAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(` دسته بندی  با  موفقیت ثبت شد `);
        this.router.navigateByUrl("Type/TypeMain")
      }
    })
  }
  slugify() {
    this.typeAddForm.controls['slug'].setValue(slugify(this.typeAddForm.controls['name'].value));
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
