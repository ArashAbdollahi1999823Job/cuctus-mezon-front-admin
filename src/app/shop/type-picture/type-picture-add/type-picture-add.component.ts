import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TypePictureService} from "../type-picture-service/type-picture.service";
@Component({
  selector: 'type-picture-add',
  templateUrl: './type-picture-add.component.html',
  styleUrls: ['./type-picture-add.component.scss']
})
export class TypePictureAddComponent implements OnInit,AfterViewInit{
  public typePictureAddForm=new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null , [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('')
  });
  public typeId: string;
  constructor(private activatedRoute: ActivatedRoute,private typePictureService:TypePictureService,private toastService:ToastrService,private router:Router,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-140+ "px");
  }
  ngOnInit(): void {this.typeId=this.typePictureService.getTypeId()}
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.typePictureAddForm.patchValue({
        fileSource: file,
      })
    }
  }
  public typePictureAdd () {
    const formData = new FormData();
    formData.append('pictureUrl', this.typePictureAddForm.get("fileSource").value);
    formData.append('pictureAlt', this.typePictureAddForm.get("pictureAlt").value);
    formData.append('pictureTitle', this.typePictureAddForm.get("pictureTitle").value);
    formData.append('sort', this.typePictureAddForm.get("sort").value);
    formData.append('typeId', this.typeId);
    this.typePictureService.typePictureAdd(formData).subscribe((res:boolean)=>{
      if (res==true){
        this.toastService.success(`عکس باموفقیت اپلود شد. `);
        this.router.navigateByUrl("/TypePicture/"+this.typeId+"/TypePictureMain")
      }
    })
  }
}

