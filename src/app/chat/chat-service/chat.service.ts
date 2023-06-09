import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {MessageDto} from "../../shared/dto/Chat/message/messageDto";
import {environment} from "../../../environments/environment";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {ToastrService} from "ngx-toastr";
import {GroupDto} from "../../shared/dto/Chat/Group/GroupDto";
import {MessageSearchDto} from "../../shared/dto/Chat/message/messageSearchDto";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {GroupSearchDto} from "../../shared/dto/Chat/Group/GroupSearchDto";
import {IsReadType} from "../../shared/enums/isReadType"
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public groupSearchDto: GroupSearchDto;
  public messageSearchDto: MessageSearchDto;

  public messageDtos = new BehaviorSubject<MessageDto[]>(null);
  public messageDtos$ = this.messageDtos.asObservable();

  public groupDtos = new BehaviorSubject<GroupDto[]>(null);
  public groupDtos$ = this.groupDtos.asObservable();

  public chatHub: HubConnection;
  public chatHubUrl = environment.chatHubUrl;
  public backendUrlUser = environment.backendUrlUser;
  constructor(private http: HttpClient, private toastService: ToastrService) {}
  public CreateChatHubConnection(token: string) {
    this.chatHub = new HubConnectionBuilder().withUrl(this.chatHubUrl, {
      accessTokenFactory: () => token
    }).withAutomaticReconnect().build();

    this.chatHub.start().catch((err) => {
      this.toastService.error(environment.messages.common.failedConnectionChatHub);
    })

    this.chatHub.on("ChatMessageUpdate", () => {
      this.messageSearchDto.isRead = IsReadType.notImportant;
      this.messageSearchDto.responderPhoneNumber = null;
      this.messageSearchDto.groupName = localStorage.getItem(environment.storage.groupName);
      this.messageGetAll().subscribe((paginationMessageDtoRes: PaginationDto<MessageDto>) => {
        if (paginationMessageDtoRes) {
          this.messageDtos.next(paginationMessageDtoRes.data)
        }
      })
    })
    this.chatHub.on("GroupUpdate", () => {
      this.groupGetAll().subscribe((groupDtosRes: GroupDto[]) => {
        if (groupDtosRes) {
          this.groupDtos.next(groupDtosRes);
        }
      })
    })
  }
  public messageAdd(formData: FormData) {
    return this.http.post(`${this.backendUrlUser}/MessageUser/MessageAdd`, formData)
  }
  public groupAdd(responderPhoneNumber): Observable<GroupDto> {
    return this.http.post<GroupDto>(`${this.backendUrlUser}/GroupUser/GroupAdd`, {responderPhoneNumber: responderPhoneNumber})
  }
  public chatHubStop() {
    this.chatHub.stop().catch((err) => {
      this.toastService.error('error stop')
    })
  }
  public messageGetAll(): Observable<PaginationDto<MessageDto>> {
    let messageSearchDtoReq = new HttpParams();
    messageSearchDtoReq = messageSearchDtoReq.append('pageIndex', this.messageSearchDto.pageIndex);
    messageSearchDtoReq = messageSearchDtoReq.append('pageSize', this.messageSearchDto.pageSize);
    if (this.messageSearchDto.id) messageSearchDtoReq = messageSearchDtoReq.append("id", this.messageSearchDto.id);
    if (this.messageSearchDto.askerPhoneNumber) messageSearchDtoReq = messageSearchDtoReq.append("askerPhoneNumber", this.messageSearchDto.askerPhoneNumber);
    if (this.messageSearchDto.responderPhoneNumber) messageSearchDtoReq = messageSearchDtoReq.append("responderPhoneNumber", this.messageSearchDto.responderPhoneNumber);
    if (this.messageSearchDto.groupName) messageSearchDtoReq = messageSearchDtoReq.append("groupName", this.messageSearchDto.groupName);
    if (this.messageSearchDto.isRead) messageSearchDtoReq = messageSearchDtoReq.append("isRead", this.messageSearchDto.isRead);
    return this.http.get<PaginationDto<MessageDto>>(`${this.backendUrlUser}/MessageUser/MessageGetAll`, {params: messageSearchDtoReq})
  }
  public messageGetAllJust(): Observable<PaginationDto<MessageDto>> {
    let messageSearchDtoReq = new HttpParams();
    messageSearchDtoReq = messageSearchDtoReq.append('pageIndex', this.messageSearchDto.pageIndex);
    messageSearchDtoReq = messageSearchDtoReq.append('pageSize', this.messageSearchDto.pageSize);
    if (this.messageSearchDto.id) messageSearchDtoReq = messageSearchDtoReq.append("id", this.messageSearchDto.id);
    if (this.messageSearchDto.askerPhoneNumber) messageSearchDtoReq = messageSearchDtoReq.append("askerPhoneNumber", this.messageSearchDto.askerPhoneNumber);
    if (this.messageSearchDto.responderPhoneNumber) messageSearchDtoReq = messageSearchDtoReq.append("responderPhoneNumber", this.messageSearchDto.responderPhoneNumber);
    if (this.messageSearchDto.groupName) messageSearchDtoReq = messageSearchDtoReq.append("groupName", this.messageSearchDto.groupName);
    if (this.messageSearchDto.isRead) messageSearchDtoReq = messageSearchDtoReq.append("isRead", this.messageSearchDto.isRead);
    return this.http.get<PaginationDto<MessageDto>>(`${this.backendUrlUser}/MessageUser/MessageGetAllJust`, {params: messageSearchDtoReq})
  }
  public groupGetAll(): Observable<GroupDto[]> {
    let groupSearchDtoReq = new HttpParams();
    if (this.groupSearchDto.name) groupSearchDtoReq = groupSearchDtoReq.append("name", this.groupSearchDto.name);
    groupSearchDtoReq = groupSearchDtoReq.append("hasMessage", this.groupSearchDto.hasMessage);
    return this.http.get<GroupDto[]>(`${this.backendUrlUser}/GroupUser/GroupGetAll`, {params: groupSearchDtoReq})
  }
  public messageSearchDtoGet() {
    return this.messageSearchDto;
  }
  public messageSearchDtoSet(messageSearchDto: MessageSearchDto) {
    this.messageSearchDto = messageSearchDto;
  }
  public groupSearchDtoGet() {
    return this.groupSearchDto;
  }
  public groupSearchDtoSet(groupSearchDto: GroupSearchDto) {
    this.groupSearchDto = groupSearchDto;
  }
  public groupDelete(groupName:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlUser}/GroupUser/GroupDelete/${groupName}`)
  }
}
