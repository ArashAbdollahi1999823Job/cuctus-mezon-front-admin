import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
@Component({
  selector: 'product-picture',
  templateUrl: './product-picture.component.html',
  styleUrls: ['./product-picture.component.scss'],
  animations:[allPageAnimation]
})
export class ProductPictureComponent implements OnDestroy{
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  ngOnDestroy(): void {
  }
}
