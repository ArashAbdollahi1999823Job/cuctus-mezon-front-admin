import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserParamsDto} from "../../../shared/dto/user/userParamsDto";
import {UserService} from "../../services/user.service";
@Component({
  selector: 'app-user-pagination',
  templateUrl: './user-pagination.component.html',
  styleUrls: ['./user-pagination.component.scss']
})

export class UserPaginationComponent implements OnChanges,OnInit {
  @Output() updateUser=new EventEmitter<boolean>();
  public userParams: UserParamsDto;
  @Input() size: number | undefined;
  @Input() index: number | undefined;
  @Input() count: number | undefined;
  countItems: number[] | undefined;

  constructor(private userService: UserService) {  }
  ngOnInit() {
    this.userParams = this.userService.getUserParams();
  }
  ngOnChanges(changes: SimpleChanges): void {
        this.countItems = Array.from({length:Math.ceil((Number(this.count) / Number(this.size)))},(v,k)=>k+1);
  }
  changeIndex($event: any) {
    this.userParams.pageIndex=Number($event.srcElement.id);
    this.userService.setUserParams(this.userParams);
    this.updateUser.emit(true);
  }
}
