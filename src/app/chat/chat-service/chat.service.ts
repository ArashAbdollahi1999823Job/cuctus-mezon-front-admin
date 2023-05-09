import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import {UserDto} from "../../shared/dto/user/userDto";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {MessageDto} from "../../shared/dto/Message/messageDto";
import {MessageAddDto} from "../../shared/dto/Message/messageAddDto";
import {AuthService} from "../../auth/services/auth.service";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit{
  public askerPhoneNumber;
  public messageDtos = new BehaviorSubject<MessageDto[]>(null);
  public messageDtos$ = this.messageDtos.asObservable();
  public chatHub: HubConnection;
  public hubChatUrl = environment.hubChatUrl;
  private usersInGroups = new BehaviorSubject<UserDto[]>(null);
  public usersInGroups$ = this.usersInGroups.asObservable();

  constructor(private http: HttpClient, private toastService: ToastrService,public authService:AuthService) {
  }
  ngOnInit(): void {
    this.askerPhoneNumber=this.authService.getPhoneNumber();
  }
  public chatHubCreate(token: string) {
    this.chatHub = new HubConnectionBuilder().withUrl(this.hubChatUrl, {
      accessTokenFactory: () => token
    }).withAutomaticReconnect().build();

    this.chatHub.start().catch((err) => {
      this.toastService.error(environment.messages.common.failedConnectionChatHub);
    })

    this.chatHub.on("ShowNewMessage", (messageDto: MessageDto) => {
      if (messageDto) {
        this.messageDtos$.subscribe((messageDtos) => {
          messageDtos.push(messageDto);
          this.messageDtos = new BehaviorSubject<MessageDto[]>(messageDtos);
        })
      }
    })

    this.chatHub.on("TestSuccess", () => {
      console.log("TestSuccess")
    })
    this.chatHub.on("UpdateMessages", (messageDtos: MessageDto[]) => {
      this.messageDtos = new BehaviorSubject<MessageDto[]>(messageDtos);
      this.messageDtos$ = this.messageDtos.asObservable();
    })
    this.chatHub.on("ShowNewGroup",() => {
      console.log('slkjfklsf')
      this.userInGroupsGet(this.authService.getPhoneNumber());
    })
  }

  public createGroup(userResponderPhoneNumber: string) {
    this.chatHub.invoke<MessageDto[]>("CreateGroup", userResponderPhoneNumber).catch((err) => {
      if (this.chatHub.state == HubConnectionState.Connecting) setTimeout(() => {
        this.createGroup(userResponderPhoneNumber)
      }, 500)
    }).then((res: MessageDto[]) => {
      this.messageDtos = new BehaviorSubject<MessageDto[]>(res);
      this.messageDtos$ = this.messageDtos.asObservable();
    });
  }

  public messageAdd(messageAddDto: MessageAddDto) {
    this.chatHub.invoke("messageAdd", messageAddDto)
  }

  public userInGroupsGet(askerPhoneNumber) {
    this.chatHub.invoke<UserDto[]>("UserInGroupsGet", askerPhoneNumber).catch((err) => {
      if (this.chatHub.state == HubConnectionState.Connecting) setTimeout(() => {
        this.userInGroupsGet(askerPhoneNumber)
      }, 500)
    }).then((res: UserDto[]) => {
      this.usersInGroups.next(res);
    })
  }

  public chatHubStop() {
    this.chatHub.stop().catch((err) => {
      this.toastService.error('error stop')
    })
  }


}
