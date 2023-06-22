import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  animations:[allPageAnimation]
})
export class ProductItemComponent implements OnInit,OnDestroy{
  constructor(private changeRef: ChangeDetectorRef,private activatedRoute:ActivatedRoute) {}
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  ngOnInit(): void {
    localStorage.setItem(environment.storage.productId,this.activatedRoute.snapshot.paramMap.get('ProductId'));
  }

  ngOnDestroy(): void {
    localStorage.removeItem(environment.storage.productId);
    localStorage.removeItem(environment.storage.typeId);
    localStorage.removeItem(environment.storage.productPicture);
  }

}
