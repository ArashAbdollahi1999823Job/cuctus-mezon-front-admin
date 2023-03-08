import {Component, OnInit} from '@angular/core';
import {TypePictureService} from "../type-picture-service/type-picture.service";
@Component({
  selector: 'type-picture-nav',
  templateUrl: './type-picture-nav.component.html',
  styleUrls: ['./type-picture-nav.component.scss']
})
export class TypePictureNavComponent implements OnInit{
  public typeId: string;
  constructor(private typePictureService:TypePictureService){}
  ngOnInit(): void {
    this.typeId=this.typePictureService.getTypeId();
  }
}
