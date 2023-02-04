import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {BusyService} from "../services/busy.service";
//this interceptor work as calculator loading by busy service
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyService.show();
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Sent) {

        }
        if (event.type === HttpEventType.Response) {
          this.busyService.hide();
        }
      }),
      catchError((error) => {
        this.busyService.hide();
        return throwError(() => {
          return error
        });
      })
    );
  }
}
