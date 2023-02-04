import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {catchError} from "rxjs/internal/operators/catchError";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastrService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
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
    )
  }
}
