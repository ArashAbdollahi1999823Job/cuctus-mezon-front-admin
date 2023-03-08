import {Injectable} from '@angular/core';
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {UserDto} from "../../shared/dto/user/userDto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserParamDto} from "../../shared/dto/user/userParamDto";
import {UserEditDto} from "../../shared/dto/user/userEditDto";
import {UserAddDto} from "../../shared/dto/user/userAddDto";
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public userParamDto = new UserParamDto();
  constructor(private readonly http: HttpClient) {}
  public userEdit(userEditDto:UserEditDto):Observable<boolean>{
    return this.http.put<boolean>(`${this.backendUrlAdmin}/UserAdmin/UserEdit`,userEditDto);
  }
  public userAdd(userAddDto:UserAddDto):Observable<boolean>{
    return this.http.post<boolean>(`${this.backendUrlAdmin}/UserAdmin/UserAdd`,userAddDto);
  }
  public userDelete(id:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/UserAdmin/UserDelete/${id}`);
  }
  public userGetAll(): Observable<PaginationDto<UserDto>> {
    let requestUserParam = this.generateUserParam();
    return this.http.get<PaginationDto<UserDto>>(`${this.backendUrlAdmin}/UserAdmin/UserGetAll`, {params: requestUserParam});
  }
  private generateUserParam() {
    let requestUserParam = new HttpParams();
    if (this.userParamDto.searchPhoneNumber) requestUserParam = requestUserParam.append("searchPhoneNumber", this.userParamDto.searchPhoneNumber);
    if (this.userParamDto.searchUserName) requestUserParam = requestUserParam.append("searchUserName", this.userParamDto.searchUserName);
    if (this.userParamDto.id) requestUserParam = requestUserParam.append("id", this.userParamDto.id);
    if (this.userParamDto.phoneNumberConfirmed) requestUserParam = requestUserParam.append("phoneNumberConfirmed", this.userParamDto.phoneNumberConfirmed);
    requestUserParam = requestUserParam.append('pageIndex', this.userParamDto.pageIndex);
    requestUserParam = requestUserParam.append('pageSize', this.userParamDto.pageSize);
    requestUserParam = requestUserParam.append('roleType', this.userParamDto.roleType);
    requestUserParam = requestUserParam.append('sortType', this.userParamDto.sortType);
    return requestUserParam;
  }
  public userGetById(id:string): Observable<PaginationDto<UserDto>> {
    var requestUserParam=this.generateUserParamById(id);
    return this.http.get<PaginationDto<UserDto>>(`${this.backendUrlAdmin}/UserAdmin/UserGetAll`,{params:requestUserParam});
  }
  private generateUserParamById(id) {
    let requestUserParam = new HttpParams();
    requestUserParam=requestUserParam.append('id',id);
    return requestUserParam;
  }
  public userGetParams() {
    return this.userParamDto;
  }
  public userSetParam(userParamDto: UserParamDto) {
    this.userParamDto = userParamDto;
  }
}
