import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get('http://localhost:8000/user/profile');
  }

  addMyBooking(bookingData: any) {
    console.log('Bookinng', bookingData);
    return this.http.post('http://localhost:8000/user/myBooking', bookingData);
  }

  updateMyBooking(data: any): Observable<any> {
    console.log('Booking', data);
    return this.http.post('http://localhost:8000/user/updateMyBooking', data);
  }
}
