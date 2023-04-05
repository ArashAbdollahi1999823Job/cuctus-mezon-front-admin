import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
@Component({
  selector: 'inventory-operation',
  templateUrl: './inventory-operation.component.html',
  styleUrls: ['./inventory-operation.component.scss'],
  animations:[allPageAnimation]
})

export class InventoryOperationComponent implements AfterViewChecked{
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

}
