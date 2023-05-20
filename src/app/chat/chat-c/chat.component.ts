import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../chat-service/chat.service";
import {UserAuthorizeDto} from "../../shared/dto/identity/userAuthorizeDto";
import {AuthService} from "../../auth/services/auth.service";
@Component({
  selector: 'chat-c',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit,OnDestroy{
  private userAuthorizeDto:UserAuthorizeDto;
  constructor(private chatService:ChatService,private authService:AuthService) {}
  ngOnInit(): void {
    this.authService.currentUser$.subscribe((res:UserAuthorizeDto)=>{if(res){this.userAuthorizeDto= res}});
    this.chatService.CreateChatHubConnection(this.userAuthorizeDto.token);
  }
  ngOnDestroy(): void {
    this.chatService.chatHubStop();
  }
}
