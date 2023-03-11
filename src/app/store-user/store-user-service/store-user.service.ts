import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {StoreUserDto} from "../../shared/dto/storeUser/storeUserDto";
import {environment} from "../../../environments/environment";
import {StoreEditDto} from "../../shared/dto/store/storeEditDto";
import {StoreUserEditDto} from "../../shared/dto/storeUser/storeUserEditDto";
@Injectable({
  providedIn: 'root'
})
export class StoreUserService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public storeUserId: string;

  constructor(private authService: AuthService, private http: HttpClient) {}

  public storeUserIdSet() {
    this.storeUserId = this.authService.decodeToken(this.authService.getToken()).Id;
  }

  public storeUserIdGet() {
    return this.storeUserId;
  }

  public storeUserGet(): Observable<StoreUserDto> {
    let storeUserGetParam = new HttpParams();
    storeUserGetParam=storeUserGetParam.append('userId',this.storeUserId);
    return this.http.get<StoreUserDto>(`${this.backendUrlAdmin}/StoreUserAdmin/StoreUserGet`,{params:storeUserGetParam})
  }

  public storeUserEdit(storeUserEditDto:StoreUserEditDto):Observable<boolean>{
    return this.http.put<boolean>(`${this.backendUrlAdmin}/StoreUserAdmin/StoreUserEdit`,storeUserEditDto);
  }

}
