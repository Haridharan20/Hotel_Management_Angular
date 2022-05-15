import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  // getProfile() {
  //   return this.http.get('http://localhost:8000/user/profile');
  // }

  // addMyBooking(bookingData: any) {
  //   console.log('Bookinng', bookingData);
  //   return this.http.post('http://localhost:8000/user/myBooking', bookingData);
  // }

  storeUserData(
    token: string,
    name: string,
    uid: string,
    refresh: string,
    isAdmin: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', name);
    localStorage.setItem('uid', uid);
    localStorage.setItem('admin', isAdmin);
    this.authToken = token;
    this.user = name;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh');
    localStorage.removeItem('uid');
    localStorage.removeItem('admin');
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
