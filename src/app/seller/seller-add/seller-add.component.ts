import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IPaginationDto} from "../../shared/dto/base/IPaginationDto";
import {IUserForAdminDto} from "../../shared/dto/user/IUserForAdminDto";
import {UserService} from "../../user/services/user.service";
import {UserParamsDto} from "../../shared/dto/user/userParamsDto";
import {ShopSellerToAddDto} from "../../shared/dto/shopSeller/shopSellerToAddDto";
import {SellerService} from "../Services/seller.service";
import {ToastrService} from "ngx-toastr";
import {IShopSellerForAdminDto} from "../../shared/dto/shopSeller/IShopSellerForAdminDto";
@Component({
  selector: 'app-shopSeller-add',
  templateUrl: './seller-add.component.html',
  styleUrls: ['./seller-add.component.scss']
})
export class SellerAddComponent implements OnInit {
  constructor(private userService: UserService, private sellerService: SellerService, private toast: ToastrService) {
  }
  public seller: IUserForAdminDto[];
  public addShopSellerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    phoneNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    mobileNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    userId: new FormControl(null, [Validators.required]),
  })
  ngOnInit(): void {
    this.getSeller();
  }
  addShopSeller() {
    let shopSellerToAddDto: ShopSellerToAddDto = this.addShopSellerForm.value;
    this.sellerService.addSeller(shopSellerToAddDto).subscribe((res: IShopSellerForAdminDto) => {
      if (res) {
        this.toast.success(` مغازه ${res.name} با  موفقیت ثبت شد `)
      } else {
        this.toast.error(`خطا در ثبت فروشگاه!`)
      }
    })
  }
  getSeller() {
    let userParams = new UserParamsDto();
    userParams.roleType = 3;
    userParams.pageSize = 100;
    this.userService.setUserParams(userParams);
    this.userService.getUsers().subscribe((res) => {
      this.seller = res.data;
    });
  }
}
