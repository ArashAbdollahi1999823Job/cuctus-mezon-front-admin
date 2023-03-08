import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/internal/operators/map";
import {UserAuthorizeDto} from "../dto/identiry/userAuthorizeDto";

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  constructor(private authService: AuthService, private toastService: ToastrService) {
  }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.currentUser$.pipe(map((user: UserAuthorizeDto) => {
      if (user.roles?.includes("Admin") || user.roles?.includes("Boss") || user.roles?.includes("Seller")) {
        return true
      }
      this.toastService.error("فقط پشتیبان سایت دسترسی دارد !","خطای دسترسی")
      return false
    }));
  }
}
