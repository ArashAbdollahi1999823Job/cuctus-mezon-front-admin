import {ChangeDetectorRef, Component} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
@Component({
  selector: 'type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss'],
  animations:[allPageAnimation]
})
export class TypeComponent {
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
