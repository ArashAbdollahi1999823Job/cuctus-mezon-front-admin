import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {allPageAnimation} from "../../shared/animations/allPageAnimation";
@Component({
  selector: 'user-c',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations:[allPageAnimation]
})
export class UsersComponent implements AfterViewChecked{
  constructor(private changeRef: ChangeDetectorRef) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
