import {Component, OnDestroy, OnInit,} from '@angular/core';
import {UserDto} from "../../../shared/dto/user/userDto";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserEditDto} from "../../../shared/dto/user/userEditDto";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../user-service/user.service";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit , OnDestroy{
  public id: string;
  public usersDto: UserDto;
  public subscription:Subscription;
  public userEditForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    phoneNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"),Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(8)]),
    phoneNumberConfirmed: new FormControl(),
    roles:new FormGroup({
      boss:new FormControl(),
      admin:new FormControl(),
      seller:new FormControl(),
      user:new FormControl(),
    })
  });
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userGetById(this.id);
  }
  public userGetById(id: string) {
    return this.userService.userGetById(id).subscribe((res:PaginationDto<UserDto>) => {
      this.usersDto = res.data[0];
      this.title.setTitle("در حال اپدیت کاربر" + this.usersDto.username + "هستید");
      this.userEditForm.controls.userName.setValue(this.usersDto.username);
      this.userEditForm.controls.phoneNumber.setValue(this.usersDto.phoneNumber);
      this.userEditForm.controls.password.setValue(this.usersDto.password);
      this.userEditForm.controls.phoneNumberConfirmed.setValue(this.usersDto.phoneNumberConfirmed);
      this.usersDto.roles.forEach(value => {
        if(value.name=="Boss")this.userEditForm.controls.roles.controls.boss.setValue(true);
        if(value.name=="Admin")this.userEditForm.controls.roles.controls.admin.setValue(true);
        if(value.name=="Seller")this.userEditForm.controls.roles.controls.seller.setValue(true);
        if(value.name=="User")this.userEditForm.controls.roles.controls.user.setValue(true);
      })
    })
  }
  userEdit() {
    let userEditDto=new UserEditDto;
    userEditDto.id =this.id;
    userEditDto.password=this.userEditForm.controls.password.value;
    userEditDto.phoneNumber=this.userEditForm.controls.phoneNumber.value;
    userEditDto.username=this.userEditForm.controls.userName.value;
    userEditDto.phoneNumberConfirmed=this.userEditForm.controls.phoneNumberConfirmed.value;
    let roles:string[]=[];
    if(this.userEditForm.controls.roles.controls.boss.value==true)roles.push("Boss");
    if(this.userEditForm.controls.roles.controls.admin.value==true)roles.push("Admin");
    if(this.userEditForm.controls.roles.controls.seller.value==true)roles.push("Seller");
    if(this.userEditForm.controls.roles.controls.user.value==true)roles.push("User");
    userEditDto.roles=roles;
    return this.userService.userEdit(userEditDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(`کاربر باموفقیت اپدیت شد.`);
        this.router.navigateByUrl("/User/UserMain");

      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}

