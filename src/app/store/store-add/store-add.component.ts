import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../shared/dto/user/userDto";
import {UserSearchDto} from "../../shared/dto/user/userSearchDto";
import {ToastrService} from "ngx-toastr";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {UserService} from "../../user/user-service/user.service";
import {StoreAddDto} from "../../shared/dto/store/storeAddDto";
import {StoreService} from "../store-service/store.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.scss']
})

export class StoreAddComponent implements OnInit,OnDestroy,AfterViewInit {
  constructor(private userService: UserService, private storeService: StoreService, private toast: ToastrService,private router:Router,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-120+ "px");
  }
  public usersDto: UserDto[];
  public subscription:Subscription;
  public storeAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    phoneNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    mobileNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    userId: new FormControl(null, [Validators.required]),
  })
  ngOnInit(): void {
    this.userGet();
  }
  storeAdd() {
    let storeAddDto: StoreAddDto = this.storeAddForm.value;
    this.storeService.storeAdd(storeAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(`مغازه با موفقیت ثبت شد`);
        this.router.navigateByUrl("/Store/StoreMain")
      }
    })
  }
  userGet() {
    let userParamDto = new UserSearchDto();
    userParamDto.roleType = 3;
    userParamDto.pageSize = 100;
    this.userService.userSearchDtoSet(userParamDto);
   this.subscription= this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>) => {
      this.usersDto = res.data;
    });
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
