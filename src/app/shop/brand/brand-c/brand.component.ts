import {ChangeDetectorRef, Component} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
@Component({
  selector: 'brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  animations:[allPageAnimation]
})
export class BrandComponent {
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
