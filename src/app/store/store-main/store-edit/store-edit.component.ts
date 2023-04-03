  import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {UserParamDto} from "../../../shared/dto/user/userParamDto";
import {UserDto} from "../../../shared/dto/user/userDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {UserService} from "../../../user/user-service/user.service";
import {StoreService} from "../../store-service/store.service";
import {StoreDto} from "../../../shared/dto/store/storeDto";
import {StoreEditDto} from "../../../shared/dto/store/storeEditDto";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.scss']
})

export class StoreEditComponent implements OnInit,OnDestroy{
  constructor(private storeService: StoreService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private userService:UserService,private router:Router) {}
  public id: string;
  public usersDto:UserDto[];
  public storeDto: StoreDto;
  public subscription:Subscription;
  public storeEditForm=new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    phoneNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    mobileNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    userId: new FormControl(null, [Validators.required]),
    isActive: new FormControl(),
  })
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.storeGetById(this.id);
    this.userGet();
  }
  public storeGetById(id: string) {
    this.subscription= this.storeService.storeGetById(id).subscribe((res:PaginationDto<StoreDto>) => {
      this.storeDto = res.data[0];
      this.title.setTitle("در حال اپدیت مغازه" +res.data[0].name  + " هستید ");
      this.storeEditForm.controls.name.setValue(this.storeDto.name);
      this.storeEditForm.controls.phoneNumber.setValue(this.storeDto.phoneNumber);
      this.storeEditForm.controls.mobileNumber.setValue(this.storeDto.mobileNumber);
      this.storeEditForm.controls.address.setValue(this.storeDto.address);
      this.storeEditForm.controls.description.setValue(this.storeDto.description);
      this.storeEditForm.controls.userId.setValue(this.storeDto.userId);
      this.storeEditForm.controls["isActive"].setValue(this.storeDto.isActive);
    })
  }
  userGet() {
    let userParam = new UserParamDto();
    userParam.roleType = 3;
    userParam.pageSize = 100;
    this.userService.userSetParam(userParam);
    this.subscription= this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>) => {
      this.usersDto = res.data;
    });
  }
  storeEdit() {
    let storeEditDto=new StoreEditDto();
    storeEditDto.id =this.id;
    storeEditDto.name=this.storeEditForm.controls.name.value;
    storeEditDto.phoneNumber=this.storeEditForm.controls.phoneNumber.value;
    storeEditDto.mobileNumber=this.storeEditForm.controls.mobileNumber.value;
    storeEditDto.description=this.storeEditForm.controls.description.value;
    storeEditDto.address=this.storeEditForm.controls.address.value;
    storeEditDto.userId=this.storeEditForm.controls.userId.value;
    storeEditDto.isActive= this.storeEditForm.controls['isActive'].value;

    this.subscription= this.storeService.storeEdit(storeEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(`مغازه باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("/Store/StoreMain");
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}

