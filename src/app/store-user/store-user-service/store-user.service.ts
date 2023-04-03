import {Injectable, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {StoreUserDto} from "../../shared/dto/storeUser/storeUserDto";
import {environment} from "../../../environments/environment";
import {StoreUserEditDto} from "../../shared/dto/storeUser/storeUserEditDto";
@Injectable({
  providedIn: 'root'
})
export class StoreUserService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  constructor( private http: HttpClient) {}
  public storeUserGet(): Observable<StoreUserDto> {
    let storeUserGetParam = new HttpParams();
    storeUserGetParam=storeUserGetParam.append('id',localStorage.getItem(environment.storeId));
    return this.http.get<StoreUserDto>(`${this.backendUrlAdmin}/StoreUserAdmin/StoreUserGet`,{params:storeUserGetParam})
  }
  public storeUserEdit(storeUserEditDto:StoreUserEditDto):Observable<boolean>{
    return this.http.put<boolean>(`${this.backendUrlAdmin}/StoreUserAdmin/StoreUserEdit`,storeUserEditDto);
  }
}
