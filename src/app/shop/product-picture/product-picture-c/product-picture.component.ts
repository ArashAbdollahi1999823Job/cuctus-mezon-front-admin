import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
import {ActivatedRoute} from "@angular/router";
import {ProductPictureService} from "../product-picture-service/product-picture.service";
@Component({
  selector: 'product-picture',
  templateUrl: './product-picture.component.html',
  styleUrls: ['./product-picture.component.scss'],
  animations:[allPageAnimation]
})
export class ProductPictureComponent implements OnInit{
  public productId: string;
  constructor(private changeRef: ChangeDetectorRef,private productPictureService:ProductPictureService, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('ProductId');
    this.productPictureService.setProductId(this.productId);
  }
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
