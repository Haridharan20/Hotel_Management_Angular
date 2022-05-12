import { Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
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
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private handleError(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.refresh) {
      this.refresh = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((newTokens: any) => {
          this.refresh = false;
          this.refreshTokenSubject.next(newTokens.accessToken);
          console.log('tokenswer', newTokens);
          localStorage.setItem('token', newTokens.accessToken);
          return next.handle(
            this.addToken(req, this.authService.getAccessToken())
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          console.log('jwt', jwt);
          return next.handle(this.addToken(req, jwt));
        })
      );
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
