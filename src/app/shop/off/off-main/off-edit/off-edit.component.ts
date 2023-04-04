import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";
import {OffDto} from "../../../../shared/dto/off/offDto";
import {OffService} from "../../off-service/off.service";
import {OffEditDto} from "../../../../shared/dto/off/offEditDto";
@Component({
  selector: 'off-edit',
  templateUrl: './off-edit.component.html',
  styleUrls: ['./off-edit.component.scss']
})
export class OffEditComponent implements OnDestroy {
  public offId: string;
  public offDto: OffDto;

  public subscription:Subscription;
  public offEditForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    offPercent: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(1)]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
  })
  constructor(private offService: OffService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.offId = this.activatedRoute.snapshot.paramMap.get('OffId');
    this.offGetById(this.offId);
  }
  public offGetById(id: string) {
    this.subscription= this.offService.offGetById(id).subscribe((res:OffDto[]) => {
      this.offDto = res[0];
      this.title.setTitle("در حال اپدیت تخفیف" +res[0].name  + " هستید ");
      this.offEditForm.controls["name"].setValue(this.offDto.name);
      this.offEditForm.controls["description"].setValue(this.offDto.description);
      this.offEditForm.controls["offPercent"].setValue(this.offDto.offPercent);
      this.offEditForm.controls["startDate"].setValue(this.offDto.startDate);
      this.offEditForm.controls["endDate"].setValue(this.offDto.endDate);
    })
  }
  offEdit() {
    let offEditDto=new OffEditDto();
    offEditDto.id =this.offId;
    offEditDto.name= this.offEditForm.controls['name'].value;
    offEditDto.description= this.offEditForm.controls['description'].value;
    offEditDto.offPercent= this.offEditForm.controls['offPercent'].value;
    offEditDto.startDate= this.offEditForm.controls['startDate'].value;
    offEditDto.endDate= this.offEditForm.controls['endDate'].value;
    this.subscription= this.offService.offEdit(offEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(` تخفیف باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("/Off/OffMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
