import {ChangeDetectorRef, Component} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations:[allPageAnimation]
})
export class InventoryComponent {
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
