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
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  constructor(
    private service: AuthService,
    private route: Router,
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
    if (this.service.isAdmin() && !this.service.loggedIn()) {
      return true;
    } else if (!this.service.isAdmin() && !this.service.loggedIn()) {
      this.toastr.error('You are not an admin', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      this.route.navigate(['/']);
      return false;
    } else {
      this.service.logout();
      return false;
    }
  }
}
