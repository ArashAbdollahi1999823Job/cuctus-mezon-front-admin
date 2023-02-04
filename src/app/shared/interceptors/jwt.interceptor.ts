import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../auth/services/auth.service";
import {catchError} from "rxjs/internal/operators/catchError";
import {throwError} from "rxjs/internal/observable/throwError";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private toastService:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    {
      const  token  = this.authService.getToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error) {
            switch (error.error.statusCode) {
              /*  case 404:
                  this.router.navigateByUrl("./");
                  this.toastService.error(error.error.message)
                  break;
                case 401:
                  this.router.navigateByUrl("/auth");
                  this.toastService.error(error.error.message)
                  break;
                default:
                  break;*/
            }
          }
          return throwError(() => {
            this.toastService.error(error.error.message,error.statusText)
            return error;
          })
        })
      );
    }
   /* return next.handle(request);*/
  }
}
