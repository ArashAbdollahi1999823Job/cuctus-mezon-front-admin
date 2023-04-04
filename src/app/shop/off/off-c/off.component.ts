import {ChangeDetectorRef, Component} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
@Component({
  selector: 'off',
  templateUrl: './off.component.html',
  styleUrls: ['./off.component.scss'],
  animations:[allPageAnimation]
})
export class OffComponent {
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
