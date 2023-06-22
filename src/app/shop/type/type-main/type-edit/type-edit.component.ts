import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2} from '@angular/core';
import {slugify} from "../../../../shared/tool/slugify";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TypeDto} from "../../../../shared/dto/type/typeDto";
import {TypeService} from "../../type-service/type.service";
import {PaginationDto} from "../../../../shared/dto/base/paginationDto";
import {TypeEditDto} from "../../../../shared/dto/type/typeEditDto";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'type-edit',
  templateUrl: './type-edit.component.html',
  styleUrls: ['./type-edit.component.scss']
})
export class TypeEditComponent implements OnDestroy,AfterViewInit {
  public typesDto:TypeDto[];
  public id: string;
  public subscription:Subscription;
  public typeEditForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    slug: new FormControl(null, [Validators.required, Validators.maxLength(60), Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    metaDescription: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    summary: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    parentTypeId: new FormControl(null, [Validators.required]),
    isActive: new FormControl(),
    isDelete: new FormControl(),
  })
  public typeDto: TypeDto;
  constructor(private typeService: TypeService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-120+ "px");
  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.typeGet();
    this.typeGetById(this.id);
  }
  public typeGetById(id: string) {
    this.subscription= this.typeService.typeGetById(id).subscribe((res:PaginationDto<TypeDto>) => {
      if(res){
        this.typeDto = res.data[0];
        if(this.typeDto.parentTypeId==null)this.typeDto.parentTypeId="00000000-0000-0000-0000-000000000000";
        this.title.setTitle(" در حال اپدیت دسته " +res.data[0].name  + " هستید ");
        this.typeEditForm.controls["name"].setValue(this.typeDto.name);
        this.typeEditForm.controls["slug"].setValue(this.typeDto.slug);
        this.typeEditForm.controls["description"].setValue(this.typeDto.description);
        this.typeEditForm.controls["metaDescription"].setValue(this.typeDto.metaDescription);
        this.typeEditForm.controls["summary"].setValue(this.typeDto.summary);
        this.typeEditForm.controls["parentTypeId"].setValue(this.typeDto.parentTypeId);
        this.typeEditForm.controls["isActive"].setValue(this.typeDto.isActive);
        this.typeEditForm.controls["isDelete"].setValue(false);
      }
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
    typeEditDto.slug= this.typeEditForm.controls['slug'].value;
    this.subscription= this.typeService.typeEdit(typeEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` دسته باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("Type/TypeMain")
      }
    })
  }
  slugify() {
    this.typeEditForm.controls['slug'].setValue(slugify(this.typeEditForm.controls['name'].value));
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
