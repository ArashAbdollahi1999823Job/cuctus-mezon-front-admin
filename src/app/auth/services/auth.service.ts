import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ILoginDto} from "../../shared/dto/identiry/ILoginDto";
import {Observable} from "rxjs";
import {IUserDto} from 'src/app/shared/dto/identiry/IUserDto';
import {map} from "rxjs/internal/operators/map";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = environment.backendUrl;
  private currentUser = new BehaviorSubject<IUserDto>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(loginDto: ILoginDto): Observable<IUserDto> {
    return this.http.post<IUserDto>(`${this.backendUrl}/account/login`, loginDto).pipe(map((res): IUserDto => {
        if (res) {
          this.setCurrentUser(res);
          this.router.navigateByUrl('/product');
          return res;
        }
        return null;
      })
    );
  }
  public logout() {
    localStorage.removeItem(environment.keyUserToken);
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }
  public setCurrentUser(user: IUserDto) {
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
    const user = <IUserDto>JSON.parse(localStorage.getItem(environment.keyUserToken))
    if (user) {
      return user.token;
    }
    return null
  }
  public decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
  }
}
