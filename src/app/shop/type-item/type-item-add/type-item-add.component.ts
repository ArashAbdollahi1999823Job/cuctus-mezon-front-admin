import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {TypeItemService} from "../type-item-service/type-item.service";
import {TypeItemAddDto} from "../../../shared/dto/typeItem/typeItemAddDto";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'type-item-add',
  templateUrl: './type-item-add.component.html',
  styleUrls: ['./type-item-add.component.scss']
})

export class TypeItemAddComponent implements OnDestroy{
  public subscription:Subscription;
  public typeItemAddForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
  })
  constructor(private typeItemService: TypeItemService, private toast: ToastrService, private router:Router) {}
  typeItemAdd() {
    let typeItemAddDto: TypeItemAddDto = this.typeItemAddForm.value;
    typeItemAddDto.typeId=localStorage.getItem(environment.storage.typeId)
    this.subscription= this.typeItemService.typeItemAdd(typeItemAddDto).subscribe((res: boolean) => {
      if (res==true) {
        this.toast.success(environment.messages.typeItem.typeItemAddSuccess);
        this.router.navigateByUrl("TypeItem/TypeItemMain")
      }
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){this.subscription.unsubscribe();}
  }
}
