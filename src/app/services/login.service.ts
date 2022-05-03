import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  name!: string;
  constructor(private http: HttpClient) {}
  userLogin(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8000/user/login', {
      username,
      password,
    });
    // .pipe(catchError((err) => this.handleError(err)));
  }

  setSessionName(name: string) {
    this.name = name;
  }
  getSessionName(): string {
    return this.name;
  }
  // private handleError(error: HttpErrorResponse) {
  //   console.log(error);
  //   return throwError(
  //     () => new Error('Something bad happened; please try again later.')
  //   );
  // }
}
