import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {ColorService} from "../color-service/color.service";
import {ColorAddDto} from "../../../shared/dto/color/colorAddDto";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.scss']
})

export class ColorAddComponent implements OnDestroy,AfterViewInit{
  public subscription:Subscription;
  public colorAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    value: new FormControl(null, [Validators.required]),
  })
  constructor(private colorService: ColorService, private toast: ToastrService, private router:Router,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-150+ "px");
  }
  colorAdd() {
    let colorAddDto: ColorAddDto = this.colorAddForm.value;
    colorAddDto.productId=localStorage.getItem(environment.storage.productIdForColor)
    this.subscription= this.colorService.colorAdd(colorAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(environment.messages.color.colorAddSuccess);
        this.router.navigateByUrl("Color/"+localStorage.getItem(environment.storage.productIdForColor)+"/ColorMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
