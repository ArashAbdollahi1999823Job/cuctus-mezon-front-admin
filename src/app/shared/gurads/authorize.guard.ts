import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../auth/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {map} from "rxjs/internal/operators/map";

@Injectable({
  providedIn: 'root'
})

export class AuthorizeGuard implements CanActivate {
  constructor(private authService: AuthService, private toast: ToastrService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.currentUser$.pipe(map((user) => {
      if (user) {
        return true;
      } else {
        this.toast.error("ابتدا وارد سایت شوید");
        this.router.navigateByUrl("/Auth");
        return false;
      }
    }));
  }
}
