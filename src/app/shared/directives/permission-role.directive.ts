import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserAuthorizeDto} from "../dto/identity/userAuthorizeDto";
import {AuthService} from "../../auth/services/auth.service";
import { first } from 'rxjs/internal/operators/first';
@Directive({
  selector: '[appPermissionRole]'
})
export class PermissionRoleDirective implements OnInit{
  @Input() appPermissionRole:string[];
  user:UserAuthorizeDto;
  constructor(private viewContainerRef:ViewContainerRef,private templateRef:TemplateRef<any>,private authService:AuthService) { }
  ngOnInit(): void {
    this.authService.currentUser$.pipe(first()).subscribe((user:UserAuthorizeDto)=>{
      this.user=user;
      if(!this.user?.roles && this.user){
        this.viewContainerRef.clear();
        return;
      }
      if(this.user?.roles.some(x=>this.appPermissionRole.includes(x))){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }else{
        this.viewContainerRef.clear();
      }

    })
  }

}
