import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) {}
  userLogin(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8000/user/login', {
      username,
      password,
    });
  }

  getProfile() {
    console.log(this.user);
    console.log('called');
    this.getToken();
    console.log('this', this.authToken);
    const headers = new HttpHeaders({
      Authorization: this.authToken,
    });
    console.log(headers);
    return this.http.get('http://localhost:8000/user/profile', {
      headers,
    });
  }

  storeUserData(token: string, name: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', name);
    this.authToken = token;
    this.user = name;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  loggedIn() {
    const isExpire = new JwtHelperService();
    let localToken = localStorage.getItem('token')?.slice(4);
    // console.log('auth', this.authToken);
    // console.log(localToken);
    // console.log('Expire', isExpire.isTokenExpired(localToken));
    return isExpire.isTokenExpired(localToken);
  }

  getToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }
}
