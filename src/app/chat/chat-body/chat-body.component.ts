import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from "../chat-service/chat.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {MessageAddDto} from "../../shared/dto/Message/messageAddDto";
import {UserDto} from "../../shared/dto/user/userDto";
import {UserSearchDto} from "../../shared/dto/user/userSearchDto";
import {UserService} from "../../user/user-service/user.service";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
@Component({
  selector: 'chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit, OnDestroy {
  responderPhoneNumber: string;
  userDtoResponder:UserDto;

  private subscription:Subscription;
  public messageAddForm: FormGroup = new FormGroup({
    responderPhoneNumber: new FormControl(null,[]),
    content: new FormControl(null,[]),
    pictureUrl: new FormControl(null,[])
  })
  constructor(public chatService: ChatService, private activatedRoute: ActivatedRoute,private router:Router,private userService:UserService) {}

  ngOnInit(): void {
    if(this.subscription)this.subscription.unsubscribe();
    this.subscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.ngOnInit();
      }
    })
   this.responderPhoneNumber=this.activatedRoute.snapshot.paramMap.get('PhoneNumber');
    this.chatService.createGroup(this.responderPhoneNumber)
    this.userResponderGet();
  }
  public messageAdd() {
    let messageAddDto:MessageAddDto=this.messageAddForm.value;
    messageAddDto.responderPhoneNumber=this.responderPhoneNumber;
    this.chatService.messageAdd(messageAddDto);
  }

  public userResponderGet(){
    let userSearchDto=new UserSearchDto();
    userSearchDto.searchPhoneNumber=this.responderPhoneNumber;
    this.userService.userSearchDtoSet(userSearchDto);
    this.userService.userGetAll().subscribe((res:PaginationDto<UserDto>)=>{
      this.userDtoResponder=res.data[0];
    })

  }
  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}
