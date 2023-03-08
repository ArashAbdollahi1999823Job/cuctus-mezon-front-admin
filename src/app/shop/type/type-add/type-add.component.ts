import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TypeDto} from "../../../shared/dto/Type/typeDto";
import {TypeService} from "../type-service/type.service";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {TypeAddDto} from "../../../shared/dto/Type/typeAddDto";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
@Component({
  selector: 'type-add',
  templateUrl: './type-add.component.html',
  styleUrls: ['./type-add.component.scss']
})

export class TypeAddComponent implements OnInit , OnDestroy{
  public typesDto:TypeDto[];
  public subscription:Subscription;
  public typeAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    summary: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    parentTypeId: new FormControl(null, [Validators.required]),
  })
  constructor(private typeService: TypeService, private toast: ToastrService,private router:Router) {}
  ngOnInit(): void {this.typeGet();}
  typeGet() {
    this.subscription= this.typeService.typeGet().subscribe((res:PaginationDto<TypeDto>) => {
      this.typesDto = res.data;
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
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
