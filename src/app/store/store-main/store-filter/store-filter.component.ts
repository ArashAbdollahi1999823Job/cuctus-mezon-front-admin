import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UserDto} from "../../../shared/dto/user/userDto";
import {UserParamDto} from "../../../shared/dto/user/userParamDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {UserService} from "../../../user/user-service/user.service";
import {StoreParamDto} from "../../../shared/dto/store/storeParamDto";
import {StoreService} from "../../store-service/store.service";
@Component({
  selector: 'store-filter',
  templateUrl: './store-filter.component.html',
  styleUrls: ['./store-filter.component.scss']
})
export class StoreFilterComponent implements OnInit{

  //this is user as seller
  public usersDto: UserDto[];
  public storeParamDto:StoreParamDto;
  @ViewChild("phoneNumber",{static:false}) phoneNumber:ElementRef;
  @ViewChild("mobileNumber",{static:false}) mobileNumber:ElementRef;
  @ViewChild("name",{static:false}) name:ElementRef;
  @Output() storeUpdate=new EventEmitter<boolean>();
  constructor(private ef:ElementRef,private userService: UserService,private storeService:StoreService){}
  ngOnInit(): void {
    this.userGet();
    this.storeParamDto=this.storeService.storeGetParam();
  }
  activeType=[
    {key:1,title:'فعال'},
    {key:2,title:'غیرفعال'},
  ];
  sortType=[
    {key:1,title:'اول به اخر'},
    {key:2,title:'اخر به اول'},
  ];
  userGet() {
    let userParamDto = new UserParamDto();
    userParamDto.roleType = 3;
    userParamDto.pageSize = 100;
    this.userService.userSetParam(userParamDto);
    this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>) => {
      this.usersDto = res.data;
    });
  }
  changePhoneNumberSearch() {
    this.storeParamDto.phoneNumber=this.phoneNumber?.nativeElement?.value;
    this.storeService.storeSetParam(this.storeParamDto);
    this.storeUpdate.emit(true)
  }
  changeMobileNumberSearch() {
    this.storeParamDto.mobileNumber=this.mobileNumber?.nativeElement?.value;
    this.storeService.storeSetParam(this.storeParamDto);
    this.storeUpdate.emit(true)
  }
  changeNameSearch() {
    this.storeParamDto.name=this.name?.nativeElement?.value;
    this.storeService.storeSetParam(this.storeParamDto);
    this.storeUpdate.emit(true)
  }
  onChangeActiveType(activeType:any) {
    this.storeParamDto.activeType=activeType;
    this.storeService.storeSetParam(this.storeParamDto);
    this.storeUpdate.emit(true)
  }
  onChangeSortType(sortType:any) {
    this.storeParamDto.sortType=sortType;
    this.storeService.storeSetParam(this.storeParamDto);
    this.storeUpdate.emit(true)
  }
  onChangeUser(user:any) {
    this.storeParamDto.userId=user;
    this.storeService.storeSetParam(this.storeParamDto);
    this.storeUpdate.emit(true)
  }
}
