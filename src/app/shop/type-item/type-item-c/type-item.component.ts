import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.scss'],
  animations:[allPageAnimation]
})
export class TypeItemComponent implements OnInit,OnDestroy{
  constructor(private changeRef: ChangeDetectorRef,private activatedRoute:ActivatedRoute) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  ngOnInit(): void {
    localStorage.setItem(environment.typeId,this.activatedRoute.snapshot.paramMap.get('TypeId'));
  }

  ngOnDestroy(): void {
    localStorage.removeItem(environment.typeId);
  }

}
