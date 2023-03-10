import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeDto} from "../../../../shared/dto/Type/typeDto";
import {TypeService} from "../../type-service/type.service";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {TypeEditDto} from "../../../../shared/dto/Type/typeEditDto";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.scss']
})
export class TypeEditComponent implements OnDestroy {
  public typesDto:TypeDto[];
  public id: string;
  public subscription:Subscription;
  public typeEditForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    summary: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    parentTypeId: new FormControl(null, [Validators.required]),
    isActive: new FormControl(),
    isDelete: new FormControl(),
  })
  public type: TypeDto;
  constructor(private typeService: TypeService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.typeGet();
    this.typeGetById(this.id);
  }
  public typeGetById(id: string) {
    this.subscription= this.typeService.typeGetById(id).subscribe((res:PaginationDto<TypeDto>) => {
      this.type = res.data[0];
      this.title.setTitle("در حال اپدیت مغازه" +res.data[0].name  + " هستید ");
      this.typeEditForm.controls["name"].setValue(this.type.name);
      this.typeEditForm.controls["description"].setValue(this.type.description);
      this.typeEditForm.controls["metaDescription"].setValue(this.type.metaDescription);
      this.typeEditForm.controls["summary"].setValue(this.type.summary);
      this.typeEditForm.controls["parentTypeId"].setValue(this.type.parentTypeId);
      this.typeEditForm.controls["isActive"].setValue(this.type.isActive);
      this.typeEditForm.controls["isDelete"].setValue(false);
    })
  }
  typeGet() {
    this.subscription=  this.typeService.typeGet().subscribe((res:PaginationDto<TypeDto>) => {
      this.typesDto = res.data;
    });
  }
  typeEdit() {
    let typeEditDto=new TypeEditDto();
    typeEditDto.id =this.id;
    typeEditDto.name= this.typeEditForm.controls['name'].value;
    typeEditDto.description= this.typeEditForm.controls['description'].value;
    typeEditDto.metaDescription=this.typeEditForm.controls["metaDescription"].value;
    typeEditDto.summary= this.typeEditForm.controls['summary'].value;
    typeEditDto.parentTypeId= this.typeEditForm.controls['parentTypeId'].value;
    typeEditDto.isActive= this.typeEditForm.controls['isActive'].value;
    typeEditDto.isDelete= this.typeEditForm.controls['isDelete'].value;
    this.subscription= this.typeService.typeEdit(typeEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` دسته باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("Type/TypeMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
