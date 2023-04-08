import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {TypeParamDto} from "../../../../shared/dto/type/typeParamDto";
import {TypeService} from "../../type-service/type.service";
@Component({
  selector: 'type-pagination',
  templateUrl: './type-pagination.component.html',
  styleUrls: ['./type-pagination.component.scss']
})
export class TypePaginationComponent {
  @Output() typeUpdate=new EventEmitter<boolean>();
  public typeParam: TypeParamDto;
  @Input() size: number ;
  @Input() index: number ;
  @Input() count: number ;
  countItems: number[];
  constructor(private typeService:TypeService) {  }
  ngOnInit() {
    this.typeParam = this.typeService.typeGetParam();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    this.typeParam.pageIndex=Number($event.srcElement.id);
    this.typeService.typeSetParam(this.typeParam);
    this.typeUpdate.emit(true);
  }
}
