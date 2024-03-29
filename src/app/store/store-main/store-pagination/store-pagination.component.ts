import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {StoreSearchDto} from "../../../shared/dto/store/storeSearchDto";
import {StoreService} from "../../store-service/store.service";

@Component({
  selector: 'store-pagination',
  templateUrl: './store-pagination.component.html',
  styleUrls: ['./store-pagination.component.scss']
})

export class StorePaginationComponent implements OnChanges,OnInit {

 @Output() storeUpdate=new EventEmitter<boolean>();
  public storeParamDto: StoreSearchDto;
  @Input() size: number ;
  @Input() index: number ;
  @Input() count: number ;
  countItems: number[] ;
  constructor(private storeService:StoreService) {  }
  ngOnInit() {
    this.storeParamDto = this.storeService.storeSearchDtoGet();
  }
  ngOnChanges(changes: SimpleChanges): void {
        this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    this.storeParamDto.pageIndex=Number($event.srcElement.id);
    this.storeService.storeSearchDtoSet(this.storeParamDto);
    this.storeUpdate.emit(true);
  }
}
