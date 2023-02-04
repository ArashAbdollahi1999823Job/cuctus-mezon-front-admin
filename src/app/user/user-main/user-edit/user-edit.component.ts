import {  Component,  OnInit, } from '@angular/core';
import {IUserForAdminDto} from "../../../shared/dto/user/IUserForAdminDto";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserForSendEditDto} from "../../../shared/dto/user/UserForSendEditDto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit{
  public id: string;
  public user: IUserForAdminDto;
  public editUserForm = new FormGroup({
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
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService) {}
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getUserById(this.id);
  }
  public getUserById(id: string) {
    return this.userService.getUserById(id).subscribe((res) => {
      this.user = res;
      this.title.setTitle("در حال اپدیت کاربر" + res.username + "هستید");
      this.editUserForm.controls.userName.setValue(this.user.username);
      this.editUserForm.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.editUserForm.controls.password.setValue(this.user.password);
      this.editUserForm.controls.phoneNumberConfirmed.setValue(this.user.phoneNumberConfirmed);
      this.user.roles.forEach(value => {
        if(value.name=="Boss")this.editUserForm.controls.roles.controls.boss.setValue(true);
        if(value.name=="Admin")this.editUserForm.controls.roles.controls.admin.setValue(true);
        if(value.name=="Seller")this.editUserForm.controls.roles.controls.seller.setValue(true);
        if(value.name=="User")this.editUserForm.controls.roles.controls.user.setValue(true);
      })
    })
  }
  editUser() {
    let user2=new UserForSendEditDto;
    user2.id =this.id;
    user2.password=this.editUserForm.controls.password.value;
    user2.phoneNumber=this.editUserForm.controls.phoneNumber.value;
    user2.username=this.editUserForm.controls.userName.value;
    user2.phoneNumberConfirmed=this.editUserForm.controls.phoneNumberConfirmed.value;
    let roles:string[]=[];
    if(this.editUserForm.controls.roles.controls.boss.value==true)roles.push("Boss");
    if(this.editUserForm.controls.roles.controls.admin.value==true)roles.push("Admin");
    if(this.editUserForm.controls.roles.controls.seller.value==true)roles.push("Seller");
    if(this.editUserForm.controls.roles.controls.user.value==true)roles.push("User");
    user2.roles=roles;
    return this.userService.editUser(user2).subscribe((res:IUserForAdminDto)=>{
      if(res){
        this.toastService.success(`کاربر${res.username}باموفقیت اپدیت شد.`)
      }
    })
  }
}

