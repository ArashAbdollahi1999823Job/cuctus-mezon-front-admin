import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {OffService} from "../off-service/off.service";
import {OffAddDto} from "../../../shared/dto/off/offAddDto";
@Component({
  selector: 'off-add',
  templateUrl: './off-add.component.html',
  styleUrls: ['./off-add.component.scss']
})

export class OffAddComponent implements OnInit , OnDestroy{
  public subscription:Subscription;
  public offAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    offPercent: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(1)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
  })
  constructor(private offService: OffService, private toast: ToastrService,private router:Router) {}
  ngOnInit(): void {}
  brandAdd() {
    let offAddDto: OffAddDto = this.offAddForm.value;
    offAddDto.storeId=localStorage.getItem('storeId');
    this.subscription= this.offService.offAdd(offAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(`تخفیف  با  موفقیت ثبت شد `);
        this.router.navigateByUrl("Off/OffMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
