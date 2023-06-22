import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
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
  constructor(private chatService:ChatService,private authService:AuthService,private renderer: Renderer2,private ef:ElementRef) {}
  ngOnInit(): void {
    this.authService.currentUser$.subscribe((res:UserAuthorizeDto)=>{if(res){this.userAuthorizeDto= res}});
    this.chatService.CreateChatHubConnection(this.userAuthorizeDto.token);
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.chat'), 'height', window.innerHeight-70+ "px");
  }
  ngOnDestroy(): void {
    this.chatService.chatHubStop();
  }
}
