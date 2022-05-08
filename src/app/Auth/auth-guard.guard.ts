import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.loggedIn()) {
      return true;
    } else if (
      localStorage.getItem('token') == null &&
      localStorage.getItem('refresh') == null
    ) {
      this.toastr.error('Login Required', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      this.router.navigate(['/login']);
      return false;
    } else {
      this.authService.logout();
      this.toastr.warning('Session Timeout', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
