import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {UserAuthorizeDto} from "../dto/identity/userAuthorizeDto";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})
export class BossGuard implements CanActivate {
  constructor(private authService: AuthService, private toastService: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.currentUser$.pipe(map((user: UserAuthorizeDto) => {
      if (user.roles?.includes("Boss")) {
        return true
      }
      this.toastService.error("فقط مدیر سایت دسترسی دارد !","خطای دسترسی")
      return false
    }));
  }

}
