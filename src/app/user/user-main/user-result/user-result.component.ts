import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUserForAdminDto} from "../../../shared/dto/user/IUserForAdminDto";
import {IPaginationDto} from "../../../shared/dto/base/IPaginationDto";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss'],
})
export class UserResultComponent {
  @Input("paginationUsers") paginationUsers: IPaginationDto<IUserForAdminDto>;
  @Output() updateUser=new EventEmitter<boolean>();
  constructor(private userService: UserService, private toastService: ToastrService) {}
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((res: boolean) => {
      if (res == true) {
        this.toastService.success(`کاربر با موفقیت حذف شد`)
        this.updateUser.emit(true)
      } else {
        this.toastService.error(`خطا در حذف کاربر`)
        this.updateUser.emit(true)
      }
    })
  }
}
