import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IShopSellerForAdminDto} from "../../../shared/dto/shopSeller/IShopSellerForAdminDto";
import {SellerService} from "../../Services/seller.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-seller-result',
  templateUrl: './seller-result.component.html',
  styleUrls: ['./seller-result.component.scss']
})
export class SellerResultComponent {
  @Input("shopSellers") shopSellers:IShopSellerForAdminDto[];
  @Output() updateShopSeller=new EventEmitter<boolean>();
  constructor(private shopSellerService: SellerService, private toastService: ToastrService) {}
   toggleActiveShopSeller (id: number) {
    this.shopSellerService.toggleActiveShopSeller(id).subscribe((res: boolean) => {
      if (res == true) {
        this.toastService.success(`مغازه با موفقیت تغیر وضعیت داد.`)
        this.updateShopSeller.emit(true)
      } else {
        this.toastService.error(`خطا در تغییر وضعیت مغازه`)
        this.updateShopSeller.emit(true)
      }
    })
  }

  deleteShopSeller(id: number) {
    this.shopSellerService.deleteShopSeller(id).subscribe((res: boolean) => {
      if (res == true) {
        this.toastService.success(`مغازه با موفقیت حذف شد.`)
        this.updateShopSeller.emit(true)
      } else {
        this.toastService.error(`خطا در حذف مغازه!`)
        this.updateShopSeller.emit(true)
      }
    })
  }
}
