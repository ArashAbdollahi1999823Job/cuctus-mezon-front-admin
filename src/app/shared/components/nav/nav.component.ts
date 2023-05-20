import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {MessageSearchDto} from "../../dto/Chat/message/messageSearchDto";
import {IsReadType} from "../../enums/isReadType";
import {ChatService} from "../../../chat/chat-service/chat.service";
import {PaginationDto} from "../../dto/base/paginationDto";
import {MessageDto} from "../../dto/Chat/message/messageDto";
import {PresenceService} from "../../services/presence.service";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public userId: string;
  constructor(private authService: AuthService,public chatService:ChatService,public presenceService:PresenceService) {}
  ngOnInit(): void {
    this.messageUnReadGetAll();
  }
  public messageUnReadGetAll(){
    let messageSearchDto=new MessageSearchDto();
    messageSearchDto.isRead=IsReadType.UnRead;
    messageSearchDto.responderPhoneNumber=this.authService.getPhoneNumber();
    this.chatService.messageSearchDtoSet(messageSearchDto);
    this.chatService.messageGetAll().subscribe((paginationMessageUnReadDtos:PaginationDto<MessageDto>)=>{
      if(paginationMessageUnReadDtos){
        this.presenceService.messageUnReadDtos.next(paginationMessageUnReadDtos.data);
      }
    })
  }
  logout() {
    this.authService.logout();
  }
}

