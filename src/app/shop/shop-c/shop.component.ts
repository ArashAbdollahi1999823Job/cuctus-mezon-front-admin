import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {allPageAnimation} from "../../shared/animations/allPageAnimation";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']  ,
  animations:[allPageAnimation]
})
export class ShopComponent implements OnInit{
  constructor(private changeRef: ChangeDetectorRef,private title:Title) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  ngOnInit(): void {
    this.title.setTitle("مدیریت فروشگاه بزرگ کاکتوس.")
  }
}
