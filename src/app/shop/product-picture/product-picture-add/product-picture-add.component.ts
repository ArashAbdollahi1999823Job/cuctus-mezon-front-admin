import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ProductPictureService} from "../product-picture-service/product-picture.service";
import {environment} from "../../../../environments/environment";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'product-picture-add',
  templateUrl: './product-picture-add.component.html',
  styleUrls: ['./product-picture-add.component.scss']
})
export class ProductPictureAddComponent implements OnDestroy ,AfterViewInit{
  private subscription: Subscription;
  public productPictureAddForm = new FormGroup({
    pictureAlt: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    pictureTitle: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    sort: new FormControl('', [Validators.min(0), Validators.max(100)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private activatedRoute: ActivatedRoute, private productPictureService: ProductPictureService, private toastService: ToastrService, private router: Router,private ef:ElementRef,private renderer: Renderer2) {
    this.productPictureAddForm.addValidators(this.PictureMaxSize());
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-150+ "px");
  }
  public PictureMaxSize() {
    return () => {
      let picture: HTMLInputElement = this.ef.nativeElement.getElementsByClassName('file')[0];
      if (picture?.files[0]?.size > Number(environment.setting.picture.pictureMaxSize)) {
        return {pictureMaxSize: "عکس ها نمیتوانند بیشتر از " + environment.setting.picture.pictureMaxSizeShow + "kb باشند"}
      }
      return null;
    };
  }

  public onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      if (event.target.files[0].size < environment.setting.picture.pictureMaxSize) {
        const file = event.target.files[0];
        this.productPictureAddForm.patchValue({
          fileSource: file,
        })
      } else {
      }
    }
  }

  public productPictureAdd():void {
    const formData = new FormData();
    formData.append('pictureUrl', this.productPictureAddForm.get("fileSource").value);
    formData.append('pictureAlt', this.productPictureAddForm.get("pictureAlt").value);
    formData.append('pictureTitle', this.productPictureAddForm.get("pictureTitle").value);
    formData.append('sort', this.productPictureAddForm.get("sort").value);
    formData.append('productId', localStorage.getItem(environment.storage.productIdForProductPictureMain));
    this.subscription = this.productPictureService.productPictureAdd(formData).subscribe((res: boolean) => {
      if (res == true) {
        this.toastService.success(environment.messages.productPicture.productPictureAddSuccess);
        this.router.navigateByUrl("/ProductPicture/ProductPictureMain")
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

