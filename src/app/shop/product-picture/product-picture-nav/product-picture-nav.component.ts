import {Component, OnInit} from '@angular/core';
import {ProductPictureService} from "../product-picture-service/product-picture.service";
@Component({
  selector: 'product-picture-nav',
  templateUrl: './product-picture-nav.component.html',
  styleUrls: ['./product-picture-nav.component.scss']
})
export class ProductPictureNavComponent implements OnInit{
  public productId: string;
  constructor(private productPictureService:ProductPictureService){}
  ngOnInit(): void {
    this.productId=this.productPictureService.getProductId();
  }
}
