import {Component, OnDestroy, OnInit} from '@angular/core';
import {StoreUserService} from "../store-user-service/store-user.service";
import {StoreUserDto} from "../../shared/dto/storeUser/storeUserDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs/internal/Subscription";
import {StoreUserEditDto} from "../../shared/dto/storeUser/storeUserEditDto";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
@Component({
  selector: 'store-user-Edit',
  templateUrl: './store-user-Edit.component.html',
  styleUrls: ['./store-user-Edit.component.scss']
})

export class StoreUserEditComponent implements OnInit , OnDestroy {
  public subscription:Subscription;
  public storeUserDto:StoreUserDto;
  public storeUserEditForm=new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    phoneNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    mobileNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
  })
  constructor(private storeUserService:StoreUserService, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit() {
    this.storeUserGet();
  }
  storeUserGet(){
    this.subscription= this.storeUserService.storeUserGet().subscribe((res:StoreUserDto)=>{
      if(res){
        this.storeUserDto=res;
        this.title.setTitle(" در حال اپدیت مغازه" +this.storeUserDto.name + " هستید ");
        this.storeUserEditForm.controls.name.setValue(this.storeUserDto.name);
        this.storeUserEditForm.controls.phoneNumber.setValue(this.storeUserDto.phoneNumber);
        this.storeUserEditForm.controls.mobileNumber.setValue(this.storeUserDto.mobileNumber);
        this.storeUserEditForm.controls.address.setValue(this.storeUserDto.address);
        this.storeUserEditForm.controls.description.setValue(this.storeUserDto.description);
      }
    });
  }
  storeEdit() {
    let storeUserEditDto=new StoreUserEditDto();
    storeUserEditDto.id =this.storeUserDto.id;
    storeUserEditDto.name=this.storeUserEditForm.controls.name.value;
    storeUserEditDto.phoneNumber=this.storeUserEditForm.controls.phoneNumber.value;
    storeUserEditDto.mobileNumber=this.storeUserEditForm.controls.mobileNumber.value;
    storeUserEditDto.description=this.storeUserEditForm.controls.description.value;
    storeUserEditDto.address=this.storeUserEditForm.controls.address.value;

    this.subscription= this.storeUserService.storeUserEdit(storeUserEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(`مغازه باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("/StoreUser/StoreUserPicture/StoreUserPictureMain");
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
