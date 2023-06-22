import {AfterViewInit, Component, ElementRef, OnDestroy, Renderer2} from '@angular/core';
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {TypeItemService} from "../../type-item-service/type-item.service";
import {TypeItemDto} from "../../../../shared/dto/typeItem/typeItemDto";
import {TypeItemSearchDto} from "../../../../shared/dto/typeItem/typeItemSearchDto";
import {environment} from "../../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'type-item-main',
  templateUrl: './type-item-main.component.html',
  styleUrls: ['./type-item-main.component.scss']
})

export class TypeItemMainComponent implements OnDestroy,AfterViewInit{
  public typeItemsDto:TypeItemDto[];
  public subscription:Subscription;
  constructor(private typeItemService:TypeItemService, private title:Title, private toastService:ToastrService,private ef:ElementRef,private renderer: Renderer2) {}
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.result'), 'height', window.innerHeight-140+ "px");
  }
  ngOnInit(): void {
    this.typeItemGetAll();
    this.title.setTitle(environment.titlePages.typeItem.typeItemMain);
  }
  private typeItemGetAll(){
    let typeItemSearchDto=new TypeItemSearchDto();
    typeItemSearchDto.typeId=localStorage.getItem(environment.storage.typeId);
    this.typeItemService.typeItemSearchDtoSet(typeItemSearchDto);
    this.subscription= this.typeItemService.typeItemGetAll().subscribe((res:TypeItemDto[])=>{
      this.typeItemsDto=res;
    });
  }
  public typeItemDelete(id: string) {
    if(confirm(environment.messages.typeItem.typeItemDoYouWantDelete)){
      this.subscription=this.typeItemService.typeItemDelete(id).subscribe((res:boolean)=>{
        if(res==true){
          this.toastService.success(environment.messages.typeItem.typeItemDeleteSuccess);
          this.typeItemGetAll()
        }
      })
    }
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
