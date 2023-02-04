import {Injectable} from '@angular/core';
import {IPaginationDto} from "../../shared/dto/base/IPaginationDto";
import {IUserForAdminDto} from "../../shared/dto/user/IUserForAdminDto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserParamsDto} from "../../shared/dto/user/userParamsDto";
import {UserForSendEditDto} from "../../shared/dto/user/UserForSendEditDto";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private backendUrl = environment.backendUrl;
  public userParams = new UserParamsDto();
  constructor(private readonly http: HttpClient) {}

  public editUser(user:UserForSendEditDto){
    return this.http.post<any>(`${this.backendUrl}/Account/EditUser`,user);
  }
  public addUser(user:UserForSendEditDto){
    return this.http.post<any>(`${this.backendUrl}/Account/AddUser`,user);
  }
  public deleteUser(id:string){
    return this.http.delete<boolean>(`${this.backendUrl}/Account/DeleteUser/${id}`, );
  }
  public getUsers(): Observable<IPaginationDto<IUserForAdminDto>> {
    let requestUserParams = this.generateUserParams();
    return this.http.get<IPaginationDto<IUserForAdminDto>>(`${this.backendUrl}/Account/GetUsers`, {params: requestUserParams});
  }
  public getUserById(id:string): Observable<IUserForAdminDto> {
    return this.http.get<IUserForAdminDto>(`${this.backendUrl}/Account/GetUser/${id}`);
  }
  public getUserParams() {
    return this.userParams;
  }
  public setUserParams(userParams: UserParamsDto) {
    this.userParams = userParams;
  }
  private generateUserParams() {
    let requestUserParams = new HttpParams();
    if (this.userParams.searchPhoneNumber) requestUserParams = requestUserParams.append("searchPhoneNumber", this.userParams.searchPhoneNumber);
    if (this.userParams.searchUserName) requestUserParams = requestUserParams.append("searchUserName", this.userParams.searchUserName);
    if (this.userParams.id) requestUserParams = requestUserParams.append("id", this.userParams.id);
    if (this.userParams.phoneNumberConfirmed) requestUserParams = requestUserParams.append("phoneNumberConfirmed", this.userParams.phoneNumberConfirmed);
    requestUserParams = requestUserParams.append('pageIndex', this.userParams.pageIndex);
    requestUserParams = requestUserParams.append('pageSize', this.userParams.pageSize);
    requestUserParams = requestUserParams.append('roleType', this.userParams.roleType);
    requestUserParams = requestUserParams.append('sortType', this.userParams.sortType);
    return requestUserParams;
  }
}
