import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {shopSellerParamsDto} from "../../../shared/dto/shopSeller/ShopSellerParamsDto";
import {SellerService} from "../../Services/seller.service";

@Component({
  selector: 'app-seller-pagination',
  templateUrl: './seller-pagination.component.html',
  styleUrls: ['./seller-pagination.component.scss']
})

export class SellerPaginationComponent implements OnChanges,OnInit {

 @Output() updateShopSeller=new EventEmitter<boolean>();
  public shopSellerParams: shopSellerParamsDto;
  @Input() size: number | undefined;
  @Input() index: number | undefined;
  @Input() count: number | undefined;
  countItems: number[] | undefined;

  constructor(private shopSellerService:SellerService) {  }
  ngOnInit() {
    this.shopSellerParams = this.shopSellerService.getShopSellerParams();
  }
  ngOnChanges(changes: SimpleChanges): void {
        this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    this.shopSellerParams.pageIndex=Number($event.srcElement.id);
    this.shopSellerService.setShopSellerParams(this.shopSellerParams);
    this.updateShopSeller.emit(true);
  }
}
