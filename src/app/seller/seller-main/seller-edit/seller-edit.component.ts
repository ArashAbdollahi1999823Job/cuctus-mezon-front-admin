import {  Component, OnInit} from '@angular/core';
import {IShopSellerForAdminDto} from "../../../shared/dto/shopSeller/IShopSellerForAdminDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SellerService} from "../../Services/seller.service";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {UserParamsDto} from "../../../shared/dto/user/userParamsDto";
import {UserService} from "../../../user/services/user.service";
import {IUserForAdminDto} from "../../../shared/dto/user/IUserForAdminDto";
import {ShopSellerForSendEditDto} from "../../../shared/dto/shopSeller/ShopSellerForSendEditDto";
@Component({
  selector: 'app-seller-edit',
  templateUrl: './seller-edit.component.html',
  styleUrls: ['./seller-edit.component.scss']
})

export class SellerEditComponent implements OnInit{
  constructor(private shopSellerService: SellerService, private activatedRoute: ActivatedRoute, private title: Title,private toastService:ToastrService,private userService:UserService) {}
  public id: string;
  public seller:IUserForAdminDto[];
  public shopSeller: IShopSellerForAdminDto;
  public editShopSellerForm=new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    phoneNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    mobileNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    userId: new FormControl(null, [Validators.required]),
  })
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getShopSellerById(this.id);
    this.getSeller();
  }
  public getShopSellerById(id: string) {
    return this.shopSellerService.getShopSellerById(id).subscribe((res) => {
      this.shopSeller = res.data[0];
      this.title.setTitle("در حال اپدیت مغازه" +res.data[0].name  + " هستید ");
      this.editShopSellerForm.controls.name.setValue(this.shopSeller.name);
      this.editShopSellerForm.controls.phoneNumber.setValue(this.shopSeller.phoneNumber);
      this.editShopSellerForm.controls.mobileNumber.setValue(this.shopSeller.mobileNumber);
      this.editShopSellerForm.controls.address.setValue(this.shopSeller.address);
      this.editShopSellerForm.controls.description.setValue(this.shopSeller.description);
      this.editShopSellerForm.controls.userId.setValue(this.shopSeller.userId);
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
  editShopSeller() {
    let shopSellerForSendEditDto=new ShopSellerForSendEditDto();
    shopSellerForSendEditDto.id =this.id;
    shopSellerForSendEditDto.name=this.editShopSellerForm.controls.name.value;
    shopSellerForSendEditDto.phoneNumber=this.editShopSellerForm.controls.phoneNumber.value;
    shopSellerForSendEditDto.mobileNumber=this.editShopSellerForm.controls.mobileNumber.value;
    shopSellerForSendEditDto.description=this.editShopSellerForm.controls.description.value;
    shopSellerForSendEditDto.address=this.editShopSellerForm.controls.address.value;
    shopSellerForSendEditDto.userId=this.editShopSellerForm.controls.userId.value;

    return this.shopSellerService.editShopSeller(shopSellerForSendEditDto).subscribe((res:IShopSellerForAdminDto)=>{
      if(res){
        this.toastService.success(`کاربر${res.name}باموفقیت اپدیت شد.`)
      }
    })
  }
}

