import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../chat-service/chat.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
import {ToastrService} from "ngx-toastr";
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
  public urlPicture;
  public divShowMessage: Element;
  public messageAddForm: FormGroup = new FormGroup({
    content: new FormControl(null, [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  })
  constructor(public chatService: ChatService, private activatedRoute: ActivatedRoute, private router: Router,
              private userService: UserService, public presenceService: PresenceService, private ef: ElementRef,private toastService: ToastrService) {
  }
  ngOnInit(): void {
    this.handleChangeRoute();
    this.responderPhoneNumber = this.activatedRoute.snapshot.paramMap.get('PhoneNumber');
    this.GroupAdd();
    this.userResponderGet();
  }
  onFileChange(event: any):void {
    let reader = new FileReader();
    if (event.target.files.length > 0) {
      let file = null;
      file = event.target.files[0];
      this.messageAddForm.patchValue({
        fileSource: file,
      })
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.urlPicture = reader.result;
      }
    }
    this.pictureShowDelete();
  }
  private GroupAdd():void {
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
  public userResponderGet():void {
    let userSearchDto = new UserSearchDto();
    userSearchDto.searchPhoneNumber = this.responderPhoneNumber;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res: PaginationDto<UserDto>) => {
      this.userDtoResponder = res.data[0];
    })
  }
  private handleChangeRoute():void {
    if (this.subscription) this.subscription.unsubscribe();
    this.subscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.ngOnInit();
      }
    })
  }
  public messageAdd():void {
    if (this.messageAddForm.controls['fileSource'].errors && this.messageAddForm.controls['content'].errors) {
      this.toastService.error(environment.messages.common.messageEmpty);
      return;
    }
      const formData = new FormData();
      formData.append('picture', this.messageAddForm.get("fileSource").value);
      formData.append('content', this.messageAddForm.get("content").value);
      formData.append('responderPhoneNumber', this.responderPhoneNumber);
      formData.append('groupName', localStorage.getItem(environment.storage.groupName));
     this.chatService.messageAdd(formData).subscribe();
    this.messageAddForm.reset();
    this.pictureDontShowDelete();
    this.messageAddForm.controls['fileSource'].reset();
    this.messageAddForm.controls['file'].reset();
    this.urlPicture = null;
    let inputPictureEl:HTMLInputElement=this.ef.nativeElement.getElementsByClassName("input-picture")[0];
    inputPictureEl.value=null;
  }
  public showFile():void {
     this.ef.nativeElement.getElementsByClassName('input-picture')[0].click();
  }
  public messageGetAll():void{
    let messageSearchDto=new MessageSearchDto();
    messageSearchDto.groupName=localStorage.getItem(environment.storage.groupName);
    messageSearchDto.isRead=IsReadType.notImportant;
    this.chatService.messageSearchDtoSet(messageSearchDto);
    this.chatService.messageGetAll().subscribe((paginationMessageDtoRes:PaginationDto<MessageDto>)=>{
      if(paginationMessageDtoRes){
        this.chatService.messageDtos.next(paginationMessageDtoRes.data);
        this.scrollToEnd();
      }
    })
  }
  private pictureShowDelete():void {
    let showFileEl: Element;
    showFileEl = this.ef.nativeElement.getElementsByClassName('btn-picture')[0];
    showFileEl.classList.add('displayNone');
    showFileEl.classList.remove('displayBlock');

    let urlPictureEl: Element;
    urlPictureEl = this.ef.nativeElement.getElementsByClassName('urlPicture')[0];
    urlPictureEl.classList.add('displayBlock');
    urlPictureEl.classList.remove('DisplayNone');
  }
  private pictureDontShowDelete():void {
    let showFileEl: Element;
    showFileEl = this.ef.nativeElement.getElementsByClassName('btn-picture')[0];
    showFileEl.classList.add('displayBlock');
    showFileEl.classList.remove('displayNone');

    let urlPictureEl: Element;
    urlPictureEl = this.ef.nativeElement.getElementsByClassName('urlPicture')[0];
    urlPictureEl.classList.add('displayNone');
    urlPictureEl.classList.remove('displayBlock');
  }
  public urlPictureDelete():void {
    if(confirm(environment.messages.common.doYouWantToCancelSendThisPicture))
    {
      this.pictureDontShowDelete();
      this.messageAddForm.controls['fileSource'].reset();
      this.messageAddForm.controls['file'].reset();
      this.urlPicture = null
      let inputPictureEl:HTMLInputElement=this.ef.nativeElement.getElementsByClassName("input-picture")[0];
      inputPictureEl.value = null;
    }
  }
  public scrollToEnd(): void {
    this.divShowMessage = this.ef.nativeElement.getElementsByClassName('show-message')[0];
    setTimeout(() => {
      this.divShowMessage.scroll({top: this.divShowMessage.scrollHeight, behavior: 'smooth'})
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
