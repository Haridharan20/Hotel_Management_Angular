import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private http: HttpClient) {}

  createHotel(hotel: any): Observable<any> {
    console.log(hotel);
    return this.http.post('http://localhost:8000/hotel/add', hotel);
  }

  getHotel(id: any): Observable<any> {
    return this.http.get(`http://localhost:8000/hotel/${id}`);
  }

  getHotelByCity(location: any): Observable<any> {
    let params = new HttpParams().set('city', location);
    return this.http.get(`http://localhost:8000/hotel/hotelByCity`, { params });
  }

  getAllHotel(): Observable<any> {
    return this.http.get('http://localhost:8000/hotel/hotels');
  }

  getHotelRooms(id: any): Observable<any> {
    return this.http.get(`http://localhost:8000/room/getRooms/${id}`);
  }

  getRoom(id: any): Observable<any> {
    return this.http.get(`http://localhost:8000/room/getRoom/${id}`);
  }

  updateHotel(hotel_id: any, rooms: any) {
    console.log(rooms, 'service');
    return this.http.put('http://localhost:8000/hotel/addroom', {
      hotel_id,
      rooms,
    });
  }

  createRoom(room: any) {
    return this.http.post('http://localhost:8000/room/add', room);
  }
}
