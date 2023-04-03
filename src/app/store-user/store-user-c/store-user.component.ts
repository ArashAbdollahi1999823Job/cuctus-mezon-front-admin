import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {allPageAnimation} from "../../shared/animations/allPageAnimation";
@Component({
  selector: 'store-user-c',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss'],
  animations:[allPageAnimation]
})

export class StoreUserComponent implements OnInit,AfterViewChecked {
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  ngOnInit(): void {
  }
}
