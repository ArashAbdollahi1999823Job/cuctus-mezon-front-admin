import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {allPageAnimation} from "../../shared/animations/allPageAnimation";
@Component({
  selector: 'store-c',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  animations:[allPageAnimation]
})

export class StoreComponent implements AfterViewChecked {
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
