import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {allPageAnimation} from "../../../shared/animations/allPageAnimation";
import {ActivatedRoute} from "@angular/router";
import {TypePictureService} from "../type-picture-service/type-picture.service";
@Component({
  selector: 'type-picture',
  templateUrl: './type-picture.component.html',
  styleUrls: ['./type-picture.component.scss'],
  animations:[allPageAnimation]
})
export class TypePictureComponent implements OnInit{
  public typeId: string;
  constructor(private changeRef: ChangeDetectorRef,private typePictureService:TypePictureService, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.typeId = this.activatedRoute.snapshot.paramMap.get('TypeId');
    this.typePictureService.setTypeId(this.typeId);
  }
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
