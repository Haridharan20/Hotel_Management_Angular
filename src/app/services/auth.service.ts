import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient, private router: Router) {}

  userRegister(
    username: string,
    email: string,
    password: string,
    phonenumber: string
  ): Observable<any> {
    return this.http.post('http://localhost:8000/user/register', {
      username,
      email,
      password,
      phonenumber,
    });
  }
  //Login
  userLogin(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8000/user/login', {
      username,
      password,
    });
  }

  getProfile() {
    // this.getToken();
    // // console.log('this', this.authToken);
    // const headers = new HttpHeaders({
    //   Authorization: this.authToken,
    // });
    // console.log(headers);
    return this.http.get('http://localhost:8000/user/profile');
  }

  storeUserData(token: string, name: string, refresh: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', name);
    this.authToken = token;
    this.user = name;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh');
  }

  loggedIn() {
    // return !this.getJwtToken();
    const isExpire = new JwtHelperService();
    let localToken = localStorage.getItem('refresh') || '';
    console.log(isExpire.isTokenExpired(localToken));
    return isExpire.isTokenExpired(localToken);
  }

  getJwtToken() {
    return localStorage.getItem('token');
  }

  getToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    return token;
  }

  refreshToken() {
    return this.http.post('http://localhost:8000/user/refresh', {
      refreshToken: this.getRefreshToken(),
    });
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh');
  }
}
