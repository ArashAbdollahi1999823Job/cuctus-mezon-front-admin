import {Component, OnInit} from '@angular/core';
import {IPaginationDto} from "../../../shared/dto/base/IPaginationDto";
import {IShopSellerForAdminDto} from "../../../shared/dto/shopSeller/IShopSellerForAdminDto";
import {SellerService} from "../../Services/seller.service";
@Component({
  selector: 'app-seller-main',
  templateUrl: './seller-main.component.html',
  styleUrls: ['./seller-main.component.scss']
})

export class SellerMainComponent implements OnInit {
  public paginationShopSeller:IPaginationDto<IShopSellerForAdminDto>;
  constructor(private sellerService:SellerService) {}
  ngOnInit(): void {
    this.getAllShopSellers();
  }
  public getAllShopSellers(){
    return this.sellerService.getAllShopSellers().subscribe((res)=>{
      this.paginationShopSeller=res;
    });
  }
  public updateShopSeller(updated: boolean) {
    if (updated) this.getAllShopSellers();
  }
}
