import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'brand',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
  animations:[allPageAnimation]
})
export class ColorComponent implements OnInit,OnDestroy{
  constructor(private changeRef: ChangeDetectorRef,private activatedRoute:ActivatedRoute) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
  ngOnInit(): void {
    localStorage.setItem(environment.storage.productIdForColor,this.activatedRoute.snapshot.paramMap.get('ProductId'));
  }
  ngOnDestroy(): void {
    localStorage.removeItem(environment.storage.productId);
  }
}
