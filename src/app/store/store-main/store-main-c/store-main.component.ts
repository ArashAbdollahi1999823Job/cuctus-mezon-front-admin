import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {StoreDto} from "../../../shared/dto/store/storeDto";
import {StoreService} from "../../store-service/store.service";
import {Subscription} from "rxjs/internal/Subscription";
import {StoreSearchDto} from "../../../shared/dto/store/storeSearchDto";
@Component({
  selector: 'store-main',
  templateUrl: './store-main.component.html',
  styleUrls: ['./store-main.component.scss']
})
export class StoreMainComponent implements OnInit, OnDestroy {
  public paginationStore: PaginationDto<StoreDto>;
  public subscription: Subscription;
  public storeSearchDto:StoreSearchDto;
  constructor(private storeService: StoreService) {
  }
  ngOnInit(): void {
    this.storeSearchDto=new StoreSearchDto();
    this.storeService.storeSearchDtoSet(this.storeSearchDto);
    this.storeGetAll();
  }
  public storeGetAll() {
    this.subscription = this.storeService.storeGetAll().subscribe((res: PaginationDto<StoreDto>) => {
      this.paginationStore = res;
    });
  }
  public storeUpdate(updated: boolean) {
    if (updated) this.storeGetAll();
  }
  ngOnDestroy(): void {
    if (this.subscription)this.subscription.unsubscribe();
  }
}
