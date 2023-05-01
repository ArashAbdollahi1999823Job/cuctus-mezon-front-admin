import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {UserDto} from "../../../shared/dto/user/userDto";
import {UserService} from "../../user-service/user.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Title} from "@angular/platform-browser";
import {UserSearchDto} from "../../../shared/dto/user/userSearchDto";
@Component({
  selector: 'user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit,OnDestroy {
  public paginationUser: PaginationDto<UserDto>;
  public subscription:Subscription;
  public userSearchDto:UserSearchDto;
  constructor(private userService: UserService,private title:Title) {}
  ngOnInit(): void {
    this.userSearchDto=new UserSearchDto();
    this.userService.userSearchDtoSet(this.userSearchDto);
    this.userGetAll();
    this.title.setTitle("مدیریت کاربران فروشگاه بزرگ کاکتوس.")
  }
  public userUpdate(updated: boolean):void {
    if (updated) this.userGetAll();
  }
  public userGetAll() :void {
    this.subscription= this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>) => {
      this.paginationUser = res;
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
