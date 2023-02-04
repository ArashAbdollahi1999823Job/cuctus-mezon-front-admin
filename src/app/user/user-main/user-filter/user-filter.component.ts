import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {UserParamsDto} from "../../../shared/dto/user/userParamsDto";
import {UserService} from "../../services/user.service";
@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss']
})
export class UserFilterComponent implements OnInit{
  public userParams:UserParamsDto;
  @ViewChild("searchPhoneNumber",{static:false}) searchPhoneNumber:ElementRef;
  @ViewChild("searchUserName",{static:false}) searchUserName:ElementRef;
  @Output() updateUser=new EventEmitter<boolean>();
  constructor(private ef:ElementRef,private userService:UserService) {}
  ngOnInit(): void {this.userParams=this.userService.getUserParams();}
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
    this.userParams.searchPhoneNumber=this.searchPhoneNumber?.nativeElement?.value;
    this.userService.setUserParams(this.userParams);
    this.updateUser.emit(true)
  }
  changeUserNameSearch() {
    this.userParams.searchUserName=this.searchUserName?.nativeElement?.value
    this.userService.setUserParams(this.userParams);
    this.updateUser.emit(true)
  }
  onChangeRoleType(roleId:any) {
    this.userParams.roleType=roleId;
    this.userService.setUserParams(this.userParams);
    this.updateUser.emit(true)
  }
  onChangeSortType(sortType: any) {
    this.userParams.sortType=sortType;
    this.userService.setUserParams(this.userParams);
    this.updateUser.emit(true)
  }
  onChangeConfirmedType(confirmedType: any) {
    this.userParams.phoneNumberConfirmed=confirmedType;
    this.userService.setUserParams(this.userParams);
    this.updateUser.emit(true)
  }
}
