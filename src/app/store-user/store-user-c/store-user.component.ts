import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {allPageAnimation} from "../../shared/animations/allPageAnimation";
import {StoreUserService} from "../store-user-service/store-user.service";
@Component({
  selector: 'store-user-c',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss'],
  animations:[allPageAnimation]
})

export class StoreUserComponent implements OnInit,AfterViewChecked {
  constructor(private changeRef: ChangeDetectorRef,private storeUserService:StoreUserService) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  ngOnInit(): void {
    this.storeUserService.storeUserIdSet();
  }

}
