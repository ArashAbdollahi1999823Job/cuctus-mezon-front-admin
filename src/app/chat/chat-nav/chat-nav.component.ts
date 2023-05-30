import {Component, ElementRef, OnInit} from '@angular/core';
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
  public expand: boolean = false;
  public navEl: Element;
  public logoEl: Element;

  constructor(private userService: UserService, public presenceService: PresenceService, public router: Router,
              private authService: AuthService, public chatService: ChatService, private ef: ElementRef) {
  }

  ngOnInit(): void {
    this.GroupGetAll();
  }
  public GroupGetAll(): void {
    let groupSearchDto = new GroupSearchDto();
    groupSearchDto.name = this.authService.getPhoneNumber();
    groupSearchDto.hasMessage = HasMessageType.HaveMessage;
    this.chatService.groupSearchDtoSet(groupSearchDto);
    this.chatService.groupGetAll().subscribe((groupDtosRes: GroupDto[]) => {
      if (groupDtosRes) {
        this.chatService.groupDtos.next(groupDtosRes);
      }
    })
  }
  public toggleExpand(): void {
    this.expand = !this.expand;
    this.navEl = this.ef.nativeElement.getElementsByClassName('nav')[0];
    this.logoEl = this.ef.nativeElement.getElementsByClassName('logo')[0];
    if (this.expand) {
      this.navEl.classList.add('width200');
      this.navEl.classList.remove('width75');
      this.logoEl.classList.add('animateRight');
      this.logoEl.classList.remove('animateLeft');
    } else {
      this.navEl.classList.add('width75');
      this.navEl.classList.remove('width200');
      this.logoEl.classList.remove('animateRight');
      this.logoEl.classList.add('animateLeft');
    }
  }
}
