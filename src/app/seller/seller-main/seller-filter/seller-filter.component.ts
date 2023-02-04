import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IUserForAdminDto} from "../../../shared/dto/user/IUserForAdminDto";
import {UserParamsDto} from "../../../shared/dto/user/userParamsDto";
import {UserService} from "../../../user/services/user.service";
import {shopSellerParamsDto} from "../../../shared/dto/shopSeller/ShopSellerParamsDto";
import {SellerService} from "../../Services/seller.service";
@Component({
  selector: 'app-seller-filter',
  templateUrl: './seller-filter.component.html',
  styleUrls: ['./seller-filter.component.scss']
})
export class SellerFilterComponent implements OnInit{

  public seller: IUserForAdminDto[];
  public shopSellerParams:shopSellerParamsDto;
  @ViewChild("phoneNumber",{static:false}) phoneNumber:ElementRef;
  @ViewChild("mobileNumber",{static:false}) mobileNumber:ElementRef;
  @ViewChild("name",{static:false}) name:ElementRef;
  @Output() updateShopSeller=new EventEmitter<boolean>();
  constructor(private ef:ElementRef,private userService: UserService,private shopSellerService:SellerService){}
  ngOnInit(): void {
    this.getSeller();
    this.shopSellerParams=this.shopSellerService.getShopSellerParams();
  }

  activeType=[
    {key:1,title:'فعال'},
    {key:2,title:'غیرفعال'},
  ];
  sortType=[
    {key:1,title:'اول به اخر'},
    {key:2,title:'اخر به اول'},
  ];
  getSeller() {
    let userParams = new UserParamsDto();
    userParams.roleType = 3;
    userParams.pageSize = 100;
    this.userService.setUserParams(userParams);
    this.userService.getUsers().subscribe((res) => {
      this.seller = res.data;
    });
  }
  changePhoneNumberSearch() {
    this.shopSellerParams.phoneNumber=this.phoneNumber?.nativeElement?.value;
    this.shopSellerService.setShopSellerParams(this.shopSellerParams);
    this.updateShopSeller.emit(true)
  }
  changeMobileNumberSearch() {
    this.shopSellerParams.mobileNumber=this.mobileNumber?.nativeElement?.value;
    this.shopSellerService.setShopSellerParams(this.shopSellerParams);
    this.updateShopSeller.emit(true)
  }
  changeNameSearch() {
    this.shopSellerParams.name=this.name?.nativeElement?.value;
    this.shopSellerService.setShopSellerParams(this.shopSellerParams);
    this.updateShopSeller.emit(true)
  }
  onChangeActiveType(activeType:any) {
    this.shopSellerParams.activeType=activeType;
    this.shopSellerService.setShopSellerParams(this.shopSellerParams);
    this.updateShopSeller.emit(true)
  }
  onChangeSortType(sortType:any) {
    this.shopSellerParams.sortType=sortType;
    this.shopSellerService.setShopSellerParams(this.shopSellerParams);
    this.updateShopSeller.emit(true)
  }
  onChangeUser(user:any) {
    this.shopSellerParams.userId=user;
    this.shopSellerService.setShopSellerParams(this.shopSellerParams);
    this.updateShopSeller.emit(true)
  }
}
