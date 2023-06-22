import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {TypePictureDto} from "../../../../shared/dto/typePicture/typePictureDto";
import {TypePictureService} from "../../type-picture-service/type-picture.service";
import {Subscription} from "rxjs/internal/Subscription";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'type-picture-main',
  templateUrl: './type-picture-main.component.html',
  styleUrls: ['./type-picture-main.component.scss']
})
export class TypePictureMainComponent implements OnInit,OnDestroy,AfterViewInit{
  // @ts-ignore
  public typePicturesDto:TypePictureDto[]|undefined;
  public backendUrlPicture = environment.setting.url.backendUrlPicture;
  public subscription:Subscription;
  constructor(private typePictureService:TypePictureService,private toastService: ToastrService,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-120+ "px");
  }
  ngOnInit(): void {
    this.getProductTypePicture();

  }
  public getProductTypePicture(){
    this.subscription= this.typePictureService.typePictureGetAll().subscribe((res:TypePictureDto[])=>{
      this.typePicturesDto=res;
    });
  }

  typePictureDelete(id: string) {
    if(confirm("ایا از حذف فیزیکی عکس دسته مطمعن هستید؟")){
     this.subscription= this.typePictureService.typePictureDelete(id).subscribe((res:boolean)=>{
        if(res==true){
          this.toastService.success(`مغازه با موفقیت حذف شد.`)
          this.getProductTypePicture();
        }
      })
    }

  }

  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
