import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}
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
}
