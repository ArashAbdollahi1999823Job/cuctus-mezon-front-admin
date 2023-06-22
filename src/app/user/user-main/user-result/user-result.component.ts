import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';
import {UserDto} from "../../../shared/dto/user/userDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../user-service/user.service";
import {Subscription} from "rxjs/internal/Subscription";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss'],
})
export class UserResultComponent implements OnDestroy,AfterViewInit {
  public backendUrlPicture=environment.setting.url.backendUrlPicture;
  @Input("paginationUser") paginationUser: PaginationDto<UserDto>;
  public subscription:Subscription;
  @Output() userUpdate=new EventEmitter<boolean>();
  constructor(private userService: UserService, private toastService: ToastrService,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-250+ "px");
  }
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
