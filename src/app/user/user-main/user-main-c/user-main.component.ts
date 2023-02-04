import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {IPaginationDto} from "../../../shared/dto/base/IPaginationDto";
import {IUserForAdminDto} from "../../../shared/dto/user/IUserForAdminDto";

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {
  public paginationUsers: IPaginationDto<IUserForAdminDto>;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getUsers();
  }
  public updateUser(updated: boolean) {
    if (updated) this.getUsers();
  }
  public getUsers() {
    return this.userService.getUsers().subscribe((res) => {
      this.paginationUsers = res;
    })
  }
}
