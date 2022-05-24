import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { globalVars } from '../url';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(`${globalVars.backendAPI}/user/profile`);
  }

  addMyBooking(bookingData: any) {
    console.log('Bookinng', bookingData);
    return this.http.post(
      `${globalVars.backendAPI}/user/myBooking`,
      bookingData
    );
  }

  updateMyBooking(data: any): Observable<any> {
    console.log('Booking', data);
    return this.http.post(
      `${globalVars.backendAPI}/user/updateMyBooking`,
      data
    );
  }

  payment(token: any, price: any, name: any): Observable<any> {
    return this.http.post(`${globalVars.backendAPI}/user/payment`, {
      token,
      price,
      name,
    });
  }

  updateProfile(data: any) {
    console.log(data);
    return this.http.post(`${globalVars.backendAPI}/user/updateProfile`, data);
  }
}
