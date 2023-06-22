import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../user-service/user.service";
import {UserAddDto} from "../../shared/dto/user/userAddDto";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnDestroy,AfterViewInit {
  public id: string;
  public subscription:Subscription;
  public userAddForm = new FormGroup({
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    userName: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
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
  constructor(private userService: UserService,private title: Title,private toastService:ToastrService,private router:Router,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-110+ "px");
  }
  userAdd():void {
    let userAddDto=new UserAddDto();
    userAddDto.password=this.userAddForm.controls.password.value;
    userAddDto.phoneNumber=this.userAddForm.controls.phoneNumber.value;
    userAddDto.username=this.userAddForm.controls.userName.value;
    userAddDto.description=this.userAddForm.controls.description.value;
    userAddDto.phoneNumberConfirmed=this.userAddForm.controls.phoneNumberConfirmed.value;
    userAddDto.name=this.userAddForm.controls.name.value;
    let roles:string[]=[];
    if(this.userAddForm.controls.roles.controls.boss.value==true)roles.push("Boss");
    if(this.userAddForm.controls.roles.controls.admin.value==true)roles.push("Admin");
    if(this.userAddForm.controls.roles.controls.seller.value==true)roles.push("Seller");
    if(this.userAddForm.controls.roles.controls.user.value==true)roles.push("User");
    userAddDto.roles=roles;
    this.subscription= this.userService.userAdd(userAddDto).subscribe((res:boolean)=>{
      if(res==true){
        this.toastService.success(`کاربر باموفقیت ثبت.`)
        this.router.navigateByUrl("/User/UserMain");
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
