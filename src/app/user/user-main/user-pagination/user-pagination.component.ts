import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserSearchDto} from "../../../shared/dto/user/userSearchDto";
import {UserService} from "../../user-service/user.service";
@Component({
  selector: 'user-pagination',
  templateUrl: './user-pagination.component.html',
  styleUrls: ['./user-pagination.component.scss']
})

export class UserPaginationComponent implements OnChanges,OnInit {
  @Output() userUpdate=new EventEmitter<boolean>();
  public userParamDto: UserSearchDto;
  @Input() size: number;
  @Input() index: number;
  @Input() count: number;
  countItems: number[] ;

  constructor(private userService: UserService) {  }
  ngOnInit() {
    this.userParamDto = this.userService.userSearchDtoGet();
  }
  ngOnChanges(changes: SimpleChanges): void {
        this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    this.userParamDto.pageIndex=Number($event.srcElement.id);
    this.userService.userSearchDtoSet(this.userParamDto);
    this.userUpdate.emit(true);
  }
}
