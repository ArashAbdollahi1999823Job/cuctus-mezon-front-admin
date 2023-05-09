import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PresenceService} from "../../shared/services/presence.service";
import {ChatService} from "../chat-service/chat.service";
import {AuthService} from "../../auth/services/auth.service";
@Component({
  selector: 'chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.scss']
})
export class ChatNavComponent implements OnInit{
  constructor(public chatService:ChatService,public presenceService:PresenceService,public router:Router,private authService:AuthService) {}
  ngOnInit(): void {
    this.chatService.userInGroupsGet(this.authService.getPhoneNumber());
  }
}
