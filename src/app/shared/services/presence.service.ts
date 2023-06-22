import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {UserAuthorizeDto} from "../dto/identity/userAuthorizeDto";
import {BehaviorSubject} from "rxjs";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {MessageDto} from "../dto/Chat/message/messageDto";
import {ChatService} from "../../chat/chat-service/chat.service";
import {MessageSearchDto} from "../dto/Chat/message/messageSearchDto";
import {IsReadType} from "../enums/isReadType";
import {PaginationDto} from "../dto/base/paginationDto";

@Injectable({
  providedIn: 'root'
})

export class PresenceService {
  private hubUrl=environment.setting.url.presenceHubUrl;
  private presenceHub:HubConnection;
  private usersOnline=new BehaviorSubject<string[]>([]);
  public messageUnReadDtos = new BehaviorSubject<MessageDto[]>(null);
  public messageUnReadDtos$ = this.messageUnReadDtos.asObservable();
  public usersOnline$=this.usersOnline.asObservable();
  constructor(private toastService:ToastrService,private chatService:ChatService) { }
  public presenceHubCreate(user :UserAuthorizeDto){
    this.presenceHub=new HubConnectionBuilder().withUrl(this.hubUrl+"/presence",{
      accessTokenFactory:()=>user?.token
    }).withAutomaticReconnect().build();

    this.presenceHub.start().catch((err)=>{
      this.toastService.error("err.message()")
    })
    this.presenceHub.on("UsersOnlineGet",(users:string[])=>{
      this.usersOnline.next(users);
    });
    this.presenceHub.on("MessageUnReadUpdate", () => {
      let messageSearchDto=new MessageSearchDto();
      messageSearchDto.isRead=IsReadType.UnRead;
      messageSearchDto.responderPhoneNumber=localStorage.getItem(environment.storage.myPhoneNumber);
      this.chatService.messageSearchDtoSet(messageSearchDto);
      this.chatService.messageGetAllJust().subscribe((paginationMessageUnReadDtoRes:PaginationDto<MessageDto>)=>{
        if(paginationMessageUnReadDtoRes){
          this.messageUnReadDtos.next(paginationMessageUnReadDtoRes.data);
        }
      })
    })
  }
  public presenceHubStop(){
    this.presenceHub.stop().catch((err)=>{
      this.toastService.error('error stop')
    })
  }
}
