import { Component } from '@angular/core';
import {IUserForAdminDto} from "../../shared/dto/user/IUserForAdminDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserForSendEditDto} from "../../shared/dto/user/UserForSendEditDto";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  public id: string;
  public user: IUserForAdminDto;
  public addUserForm = new FormGroup({
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
  constructor(private userService: UserService,private title: Title,private toastService:ToastrService) {
  }
  addUser() {
    let user2=new UserForSendEditDto;
    user2.password=this.addUserForm.controls.password.value;
    user2.phoneNumber=this.addUserForm.controls.phoneNumber.value;
    user2.username=this.addUserForm.controls.userName.value;
    user2.phoneNumberConfirmed=this.addUserForm.controls.phoneNumberConfirmed.value;
    let roles:string[]=[];
    if(this.addUserForm.controls.roles.controls.boss.value==true)roles.push("Boss");
    if(this.addUserForm.controls.roles.controls.admin.value==true)roles.push("Admin");
    if(this.addUserForm.controls.roles.controls.seller.value==true)roles.push("Seller");
    if(this.addUserForm.controls.roles.controls.user.value==true)roles.push("User");
    user2.roles=roles;
    return this.userService.addUser(user2).subscribe((res:IUserForAdminDto)=>{
      if(res){
        this.toastService.success(`کاربر${res.username}باموفقیت ثبت.`)
      }
    })
  }
}
