import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../chat-service/chat.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {UserDto} from "../../shared/dto/user/userDto";
import {UserSearchDto} from "../../shared/dto/user/userSearchDto";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {environment} from "../../../environments/environment";
import {HubConnectionState} from "@microsoft/signalr";
import {UserService} from "../../user/user-service/user.service";
import {PresenceService} from "../../shared/services/presence.service";
import {GroupDto} from "../../shared/dto/Chat/Group/GroupDto";
import {MessageSearchDto} from "../../shared/dto/Chat/message/messageSearchDto";
import {MessageDto} from "../../shared/dto/Chat/message/messageDto";
import {IsReadType} from "../../shared/enums/isReadType";

@Component({
  selector: 'chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit, OnDestroy {
  public responderPhoneNumber: string;
  private subscription: Subscription;
  public backendUrlPicture = environment.backendUrlPicture;
  public userDtoResponder: UserDto;
  public intervalReloadGroup;
  public messageAddForm: FormGroup = new FormGroup({
    content: new FormControl(null, []),
    file: new FormControl('', []),
    fileSource: new FormControl('')
  })
  constructor(public chatService: ChatService, private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService, public presenceService: PresenceService, private ef: ElementRef) {
  }
  ngOnInit(): void {
    this.handleChangeRoute();
    this.responderPhoneNumber = this.activatedRoute.snapshot.paramMap.get('PhoneNumber');
    this.GroupAdd();
    this.userResponderGet();
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.messageAddForm.patchValue({
        fileSource: file,
      })
    }
  }
  private GroupAdd() {
    this.intervalReloadGroup = setInterval(() => {
      if (this.chatService.chatHub.state == HubConnectionState.Connected) {
        this.chatService.groupAdd(this.responderPhoneNumber).subscribe((groupDtoRes: GroupDto) => {
          if(groupDtoRes){
            localStorage.setItem(environment.storage.groupName,groupDtoRes.name)
            if(groupDtoRes)clearInterval(this.intervalReloadGroup);
            this.messageGetAll();
          }
        })
      }
    }, 500)
  }
  public userResponderGet() {
    let userSearchDto = new UserSearchDto();
    userSearchDto.searchPhoneNumber = this.responderPhoneNumber;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res: PaginationDto<UserDto>) => {
      this.userDtoResponder = res.data[0];
    })
  }
  private handleChangeRoute() {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.ngOnInit();
      }
    })
  }
  public messageAdd() {
      const formData = new FormData();
      formData.append('picture', this.messageAddForm.get("fileSource").value);
      formData.append('content', this.messageAddForm.get("content").value);
      formData.append('responderPhoneNumber', this.responderPhoneNumber);
      formData.append('groupName', localStorage.getItem(environment.storage.groupName));
     this.chatService.messageAdd(formData).subscribe();
  }
  public showFile() {
    var inputFile = this.ef.nativeElement.getElementsByClassName('input-picture')[0].click();
  }
  public messageGetAll(){
    let messageSearchDto=new MessageSearchDto();
    messageSearchDto.groupName=localStorage.getItem(environment.storage.groupName);
    messageSearchDto.isRead=IsReadType.notImportant;
    this.chatService.messageSearchDtoSet(messageSearchDto);
    this.chatService.messageGetAll().subscribe((paginationMessageDtoRes:PaginationDto<MessageDto>)=>{
      if(paginationMessageDtoRes){
        this.chatService.messageDtos.next(paginationMessageDtoRes.data);
      }
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
