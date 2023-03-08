import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginDto} from "../../shared/dto/identiry/loginDto";
import {Observable} from "rxjs";
import {UserAuthorizeDto} from 'src/app/shared/dto/identiry/userAuthorizeDto';
import {map} from "rxjs/internal/operators/map";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  private currentUser = new BehaviorSubject<UserAuthorizeDto>(null);
  public currentUser$ = this.currentUser.asObservable();
  constructor(private http: HttpClient, private router: Router) {}
  public login(loginDto: LoginDto): Observable<UserAuthorizeDto> {
    return this.http.put<UserAuthorizeDto>(`${this.backendUrlAdmin}/AccountAdmin/UserLogin`, loginDto).pipe(map((res:UserAuthorizeDto)=> {
        if (res) {
          this.setCurrentUser(res);
          this.router.navigateByUrl('/Shop').then(() => {window.location.reload();})
          return res;
        }
        return null;
      })
    );
  }
  public logout() {
    localStorage.removeItem(environment.keyUserToken);
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
    localStorage.setItem(environment.keyUserToken, JSON.stringify(user))
    this.currentUser.next(user);
  }
  public getToken() {
    const user = <UserAuthorizeDto>JSON.parse(localStorage.getItem(environment.keyUserToken))
    if (user) {
      return user.token;
    }
    return null
  }
  public decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
}
