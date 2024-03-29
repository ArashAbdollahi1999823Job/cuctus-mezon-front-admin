import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginDto} from "../../shared/dto/identity/loginDto";
import {Observable} from "rxjs";
import {UserAuthorizeDto} from 'src/app/shared/dto/identity/userAuthorizeDto';
import {map} from "rxjs/internal/operators/map";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {StoreService} from "../../store/store-service/store.service";
import {StoreSearchDto} from "../../shared/dto/store/storeSearchDto";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {StoreDto} from "../../shared/dto/store/storeDto";
import {PresenceService} from "../../shared/services/presence.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrlAdmin = environment.setting.url.backendUrlAdmin;
  private currentUser = new BehaviorSubject<UserAuthorizeDto>(null);
  public currentUser$ = this.currentUser.asObservable();
  public storeParamDto=new StoreSearchDto();
  constructor(private http: HttpClient, private router: Router
              ,private storeService:StoreService,private presenceService:PresenceService) {}
  public login(loginDto: LoginDto): Observable<UserAuthorizeDto> {
    return this.http.put<UserAuthorizeDto>(`${this.backendUrlAdmin}/AccountAdmin/UserLogin`, loginDto).pipe(map((res:UserAuthorizeDto)=> {
        if (res) {
          this.setCurrentUser(res);
          this.presenceService.presenceHubCreate(res);
          localStorage.setItem(environment.storage.myPhoneNumber,this.getPhoneNumber());
          this.storeParamDto=this.storeService.storeSearchDtoGet();
          this.storeParamDto.userId=this.decodeToken(this.getToken()).Id;
          this.currentUser$.subscribe((res:UserAuthorizeDto)=>{
            if(res.roles.includes('Seller')){
              this.storeService.storeGetAll().subscribe((res:PaginationDto<StoreDto>)=>{
                if(res){
                  localStorage.setItem(environment.storage.storeId,res.data[0].id.toString())
                  this.router.navigateByUrl('/Shop').then(() => {window.location.reload();})
                }
              })
            }else{
              this.router.navigateByUrl('/Shop').then(() => {window.location.reload();})
            }
          })
          return res;
        }
        return null;
      })
    );
  }
  public logout() {
    localStorage.removeItem(environment.storage.adminToken);
    localStorage.removeItem(environment.storage.storeId);
    this.currentUser.next(null);
    window.location.reload();
  }
  public setCurrentUser(user: UserAuthorizeDto) {
    if (user) {
      let roles = this.decodeToken(user.token)?.role;
      if (Array.isArray(roles)) {
        user.roles = roles
      } else {
        user.roles=[];
        user.roles.push(roles);
      }
    }
    localStorage.setItem(environment.storage.adminToken, JSON.stringify(user))
    this.currentUser.next(user);
  }
  public getToken() {
    const user = <UserAuthorizeDto>JSON.parse(localStorage.getItem(environment.storage.adminToken))
    if (user) {
      return user.token;
    }
    return null
  }
  public decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
  public getPhoneNumber():string  {
    return  this.decodeToken(this.getToken())?.PhoneNumber;
  }
}
