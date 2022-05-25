import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { globalVars } from '../url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  pic: any;
  constructor(private http: HttpClient, private router: Router) {}

  userRegister(
    username: string,
    email: string,
    password: string,
    phonenumber: string
  ): Observable<any> {
    return this.http.post(`${globalVars.backendAPI}/user/register`, {
      username,
      email,
      password,
      phonenumber,
    });
  }
  //Login
  userLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${globalVars.backendAPI}/user/login`, {
      username,
      password,
    });
  }
  storeUserData(
    token: string,
    name: string,
    uid: string,
    refresh: string,
    image: any,
    isAdmin: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', name);
    localStorage.setItem('uid', uid);
    localStorage.setItem('admin', isAdmin);
    localStorage.setItem('pic', image?.filename);
    this.authToken = token;
    this.user = name;
    this.pic = image?.filename;
    console.log('service', this.pic);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    this.pic = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh');
    localStorage.removeItem('uid');
    localStorage.removeItem('admin');
    localStorage.removeItem('url');
    localStorage.removeItem('pic');
  }

  loggedIn() {
    // return !this.getJwtToken();
    const isExpire = new JwtHelperService();
    let localToken = localStorage.getItem('refresh') || '';
    return isExpire.isTokenExpired(localToken);
  }

  isAdmin() {
    let val = localStorage.getItem('admin') || 'no';
    if (val === 'true') {
      return true;
    } else {
      return false;
    }
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
    console.log('call from interceptor');
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
