import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {TypePictureService} from "../../type-picture-service/type-picture.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {TypePictureDto} from "../../../../shared/dto/typePicture/typePictureDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../environments/environment";
import {TypePictureEditDto} from "../../../../shared/dto/typePicture/typePictureEditDto";
@Component({
  selector: 'type-picture-edit',
  templateUrl: './type-picture-edit.component.html',
  styleUrls: ['./type-picture-edit.component.scss']
})
export class TypePictureEditComponent implements OnInit,AfterViewInit{
  public typePicturesDto:TypePictureDto;
  public typePictureId:string;
  public subscription:Subscription;
  public backendUrlPicture = environment.setting.url.backendUrlPicture;

  public typePictureEditForm=new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null , [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    isActive: new FormControl(null),
  });
  constructor(private typePictureService: TypePictureService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-200+ "px");
  }
  ngOnInit(): void {
    this.typePictureId = this.activatedRoute.snapshot.paramMap.get('TypePictureId');
    this.typePictureGetById(this.typePictureId)
  }
  public typePictureGetById(id: string) {
    this.subscription= this.typePictureService.typePictureGetById(id).subscribe((res:TypePictureDto[]) => {
      this.typePicturesDto = res[0];
      this.typePicturesDto.pictureUrl=this.backendUrlPicture+"/"+res[0].pictureUrl
      this.title.setTitle("در حال اپدیت عکس دسته" +res[0].pictureTitle  + " هستید ");

      this.typePictureEditForm.controls["pictureAlt"].setValue(this.typePicturesDto.pictureAlt);
      this.typePictureEditForm.controls["pictureTitle"].setValue(this.typePicturesDto.pictureTitle);
      this.typePictureEditForm.controls["sort"].setValue(this.typePicturesDto.sort.toString());
      this.typePictureEditForm.controls["isActive"].setValue(this.typePicturesDto.isActive);
    })
  }
  typePictureEdit() {
    let typePictureEditDto=new TypePictureEditDto();
    typePictureEditDto.id =this.typePictureId;
    typePictureEditDto.pictureTitle= this.typePictureEditForm.controls['pictureTitle'].value;
    typePictureEditDto.pictureAlt= this.typePictureEditForm.controls['pictureAlt'].value;
    typePictureEditDto.sort=this.typePictureEditForm.controls["sort"].value;
    typePictureEditDto.isActive= this.typePictureEditForm.controls['isActive'].value;
    this.subscription= this.typePictureService.typePictureEdit(typePictureEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(environment.messages.typePicture.typePictureEditSuccess);
        this.router.navigateByUrl("/TypePicture/"+this.typePictureService.getTypeId()+"/TypePictureMain")
      }
    })
  }
}
