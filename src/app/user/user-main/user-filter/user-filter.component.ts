import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UserSearchDto} from "../../../shared/dto/user/userSearchDto";
import {UserService} from "../../user-service/user.service";
@Component({
  selector: 'user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit{
  public userParamDto:UserSearchDto;
  @ViewChild("searchPhoneNumber",{static:false}) searchPhoneNumber:ElementRef;
  @ViewChild("searchUserName",{static:false}) searchUserName:ElementRef;
  @Output() userUpdate=new EventEmitter<boolean>();
  constructor(private ef:ElementRef,private userService:UserService) {}
  ngOnInit(): void {this.userParamDto=this.userService.userSearchDtoGet();}
  roleType=[
    {key:1,title:'مدیر'},
    {key:2,title:'پشتیبان'},
    {key:3,title:'فروشنده'},
    {key:4,title:'کاربر'},
  ];
  sortType=[
    {key:1,title:'اول به اخر'},
    {key:2,title:'اخر به اول'},
  ];
  phoneConfirmed=[
    {key:1,title:'تایید شده'},
    {key:2,title:'تایید نشده'},
  ];
  changePhoneSearch() {
    this.userParamDto.searchPhoneNumber=this.searchPhoneNumber?.nativeElement?.value;
    this.userService.userSearchDtoSet(this.userParamDto);
    this.userUpdate.emit(true)
  }
  changeUserNameSearch() {
    this.userParamDto.searchUserName=this.searchUserName?.nativeElement?.value
    this.userService.userSearchDtoSet(this.userParamDto);
    this.userUpdate.emit(true)
  }
  onChangeRoleType(roleId:any) {
    this.userParamDto.roleType=roleId;
    this.userService.userSearchDtoSet(this.userParamDto);
    this.userUpdate.emit(true)
  }
  onChangeSortType(sortType: any) {
    this.userParamDto.sortType=sortType;
    this.userService.userSearchDtoSet(this.userParamDto);
    this.userUpdate.emit(true)
  }
  onChangeConfirmedType(confirmedType: any) {
    this.userParamDto.phoneNumberConfirmed=confirmedType;
    this.userService.userSearchDtoSet(this.userParamDto);
    this.userUpdate.emit(true)
  }
}
