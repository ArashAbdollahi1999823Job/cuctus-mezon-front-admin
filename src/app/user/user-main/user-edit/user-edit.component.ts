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
import {UserSearchDto} from "../../../shared/dto/user/userSearchDto";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditComponent implements OnInit , OnDestroy{
  public backendUrlPicture=environment.setting.url.backendUrlPicture;
  public userId: string;
  public userDto: UserDto;
  public subscription:Subscription;
  public userEditForm = new FormGroup({
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
  public userPictureAddForm=new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('')
  });
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private router:Router) {}
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('UserId');
    this.userGetById();
  }
  public userGetById() {
    let userSearchDto=new UserSearchDto();
    userSearchDto.id=this.userId;
    this.userService.userSearchDtoSet(userSearchDto);
    return this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>) => {
      this.userDto = res.data[0];
      this.title.setTitle("در حال اپدیت کاربر" + this.userDto.username + "هستید");
      this.userEditForm.controls.userName.setValue(this.userDto.username);
      this.userEditForm.controls.name.setValue(this.userDto.name);
      this.userEditForm.controls.phoneNumber.setValue(this.userDto.phoneNumber);
      this.userEditForm.controls.password.setValue(this.userDto.password);
      this.userEditForm.controls.description.setValue(this.userDto.description);
      this.userEditForm.controls.phoneNumberConfirmed.setValue(this.userDto.phoneNumberConfirmed);
      this.userDto.roles.forEach(value => {
        if(value.name=="Boss")this.userEditForm.controls.roles.controls.boss.setValue(true);
        if(value.name=="Admin")this.userEditForm.controls.roles.controls.admin.setValue(true);
        if(value.name=="Seller")this.userEditForm.controls.roles.controls.seller.setValue(true);
        if(value.name=="User")this.userEditForm.controls.roles.controls.user.setValue(true);
      })
    })
  }
  public userEdit() {
    let userEditDto=new UserEditDto;
    userEditDto.id =this.userId;
    userEditDto.password=this.userEditForm.controls.password.value;
    userEditDto.phoneNumber=this.userEditForm.controls.phoneNumber.value;
    userEditDto.username=this.userEditForm.controls.userName.value;
    userEditDto.name=this.userEditForm.controls.name.value;
    userEditDto.description= this.userEditForm.controls.description.value;
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
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userPictureAddForm.patchValue({
        fileSource: file,
      })
    }
  }
  public userPictureAdd () {
    const formData = new FormData();
    formData.append('pictureUrl', this.userPictureAddForm.get("fileSource").value);
    formData.append('userId', this.userId);
    this.userService.userPictureAdd(formData).subscribe((res:boolean)=>{
      if (res==true){
        this.toastService.success(environment.messages.user.userPictureAddSuccess);
       this.userGetById();
      }
    })
  }
  public userPictureDelete(id: string) {
    if (confirm("ایا از فیزیکی عکس مطمعن هستید؟")) {
      this.subscription = this.userService.userPictureDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`عکس با موفقیت حذف شد.`);
          this.userGetById();
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}

