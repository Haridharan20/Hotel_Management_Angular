import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorServiceService implements HttpInterceptor {
  refresh = false;
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addToken(request, this.authService.getToken());
    console.log('ireq', request);
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleError(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handleError(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.refresh) {
      this.refresh = true;
      return this.authService.refreshToken().pipe(
        switchMap((newTokens: any) => {
          console.log('tokenswer', newTokens);
          localStorage.setItem('token', newTokens.accessToken);
          return next.handle(
            this.addToken(req, this.authService.getAccessToken())
          );
        })
      );
    } else {
      this.refresh = false;
      return next.handle(req);
    }
  }

  private addToken(req: HttpRequest<any>, token: any) {
    return req.clone({
      setHeaders: {
        Authorization: `JWT ${token}`,
      },
    });
  }
}
