import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {UserDto} from "../../../shared/dto/user/userDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../user-service/user.service";
import {Subscription} from "rxjs/internal/Subscription";
@Component({
  selector: 'user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss'],
})
export class UserResultComponent implements OnDestroy {
  @Input("paginationUser") paginationUser: PaginationDto<UserDto>;
  public subscription:Subscription;
  @Output() userUpdate=new EventEmitter<boolean>();
  constructor(private userService: UserService, private toastService: ToastrService) {}
  userDelete(id: string) {
    if(confirm("ایا از حذف کاربر مطمعن هستید؟")) {
      this.subscription = this.userService.userDelete(id).subscribe((res: boolean) => {
        if (res == true) {
          this.toastService.success(`کاربر با موفقیت حذف شد`)
          this.userUpdate.emit(true)
        } else {
          this.toastService.error(`خطا در حذف کاربر`)
          this.userUpdate.emit(true)
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
