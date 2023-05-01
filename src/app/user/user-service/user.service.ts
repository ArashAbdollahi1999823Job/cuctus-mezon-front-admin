import {Injectable} from '@angular/core';
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {UserDto} from "../../shared/dto/user/userDto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserSearchDto} from "../../shared/dto/user/userSearchDto";
import {UserEditDto} from "../../shared/dto/user/userEditDto";
import {UserAddDto} from "../../shared/dto/user/userAddDto";
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public userSearchDto = new UserSearchDto();
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
    if (this.userSearchDto.searchPhoneNumber) requestUserParam = requestUserParam.append("searchPhoneNumber", this.userSearchDto.searchPhoneNumber);
    if (this.userSearchDto.searchUserName) requestUserParam = requestUserParam.append("searchUserName", this.userSearchDto.searchUserName);
    if (this.userSearchDto.id) requestUserParam = requestUserParam.append("id", this.userSearchDto.id);
    if (this.userSearchDto.phoneNumberConfirmed) requestUserParam = requestUserParam.append("phoneNumberConfirmed", this.userSearchDto.phoneNumberConfirmed);
    requestUserParam = requestUserParam.append('pageIndex', this.userSearchDto.pageIndex);
    requestUserParam = requestUserParam.append('pageSize', this.userSearchDto.pageSize);
    requestUserParam = requestUserParam.append('roleType', this.userSearchDto.roleType);
    requestUserParam = requestUserParam.append('sortType', this.userSearchDto.sortType);
    return requestUserParam;
  }
  public userSearchDtoGet() {
    return this.userSearchDto;
  }
  public userSearchDtoSet(userSearchDto: UserSearchDto) {
    this.userSearchDto = userSearchDto;
  }
}
