import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {UserAuthorizeDto} from "../dto/identity/userAuthorizeDto";
import {BehaviorSubject} from "rxjs";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
@Injectable({
  providedIn: 'root'
})

export class PresenceService {
  private hubUrl=environment.hubUrl;
  private presenceHub:HubConnection;
  private usersOnline=new BehaviorSubject<string[]>([]);
  public usersOnline$=this.usersOnline.asObservable();
  constructor(private toastService:ToastrService) { }
  public presenceHubCreate(user :UserAuthorizeDto){
    this.presenceHub=new HubConnectionBuilder().withUrl(this.hubUrl+"/presence",{
      accessTokenFactory:()=>user?.token
    }).withAutomaticReconnect().build();

    this.presenceHub.start().catch((err)=>{
      this.toastService.error("err.message()")
    })

    this.presenceHub.on("UserIsOnline",(userName:string)=>{
      this.toastService.info(userName+"is online")
    });
    this.presenceHub.on("UserIsOffline",(userName:string)=>{
      this.toastService.error(userName+"is offline")
    });
    this.presenceHub.on("UsersOnlineGet",(users:string[])=>{
      this.usersOnline.next(users);
    });

    this.presenceHub.on("HaveNewMessage", () => {
      this.toastService.info('شما پیام جدید دارید')
    })

    this.presenceHub.on("TestSuccess",()=>{
      console.log("TestSuccess")
    })
  }
  public presenceHubStop(){
    this.presenceHub.stop().catch((err)=>{
      this.toastService.error('error stop')
    })
  }
}
