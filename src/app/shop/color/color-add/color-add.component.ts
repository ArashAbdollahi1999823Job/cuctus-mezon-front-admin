import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {ActivatedRoute, Router} from "@angular/router";
import {ColorService} from "../color-service/color.service";
import {ColorAddDto} from "../../../shared/dto/color/colorAddDto";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.scss']
})

export class ColorAddComponent implements OnDestroy{
  public subscription:Subscription;
  public colorAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    value: new FormControl(null, [Validators.required]),
  })
  constructor(private colorService: ColorService, private toast: ToastrService, private router:Router) {}
  colorAdd() {
    let colorAddDto: ColorAddDto = this.colorAddForm.value;
    colorAddDto.productId=localStorage.getItem(environment.productId)
    this.subscription= this.colorService.colorAdd(colorAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(`رنگ با موفقیت ثبت شد`);
        this.router.navigateByUrl("Color/ColorMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
