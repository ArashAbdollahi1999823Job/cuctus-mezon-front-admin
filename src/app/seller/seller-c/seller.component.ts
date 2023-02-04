import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {allPageAnimation} from "../../shared/animations/allPageAnimation";

@Component({
  selector: 'app-shopSeller-c',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
  ,
  animations:[allPageAnimation]
})

export class SellerComponent implements AfterViewChecked {
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
