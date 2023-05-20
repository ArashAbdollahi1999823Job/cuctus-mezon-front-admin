import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {UserService} from "../../user/user-service/user.service";
import {PresenceService} from "../../shared/services/presence.service";
import {GroupSearchDto} from "../../shared/dto/Chat/Group/GroupSearchDto";
import {AuthService} from "../../auth/services/auth.service";
import {ChatService} from "../chat-service/chat.service";
import {GroupDto} from "../../shared/dto/Chat/Group/GroupDto";
import {HasMessageType} from "../../shared/enums/hasMessageType";
@Component({
  selector: 'chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.scss']
})
export class ChatNavComponent implements OnInit {
  public backendUrlPicture = environment.backendUrlPicture;
  constructor(private userService: UserService, public presenceService: PresenceService, public router: Router, private authService: AuthService, public chatService: ChatService) {
  }
  ngOnInit(): void {
    this.GroupGetAll();
  }
  public GroupGetAll() {
    let groupSearchDto = new GroupSearchDto();
    groupSearchDto.name = this.authService.getPhoneNumber();
    groupSearchDto.hasMessage=HasMessageType.HaveMessage;
    this.chatService.groupSearchDtoSet(groupSearchDto);
    this.chatService.groupGetAll().subscribe((groupDtosRes: GroupDto[]) => {
      if (groupDtosRes) {
        this.chatService.groupDtos.next(groupDtosRes);
      }
    })
  }
}
