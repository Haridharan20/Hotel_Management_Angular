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

  updateBooking(room_id: any, bookingData: any): Observable<any> {
    console.log(room_id, bookingData);
    return this.http.put('http://localhost:8000/room/updateBooking', {
      id: room_id,
      dates: bookingData,
    });
  }

  createRoom(room: any) {
    return this.http.post('http://localhost:8000/room/add', room);
  }

  deleteRoom(id: any) {
    console.log(id);
    return this.http.delete(`http://localhost:8000/room/delete/${id}`);
  }

  deleteAllRooms(id: any) {
    return this.http.delete(`http://localhost:8000/room/deleteAll/${id}`);
  }

  deleteRoomFromHotel(hotelId: any, roomId: any) {
    return this.http.put('http://localhost:8000/hotel/deleteRoom', {
      hotelId,
      roomId,
    });
  }

  updateRoom(id: any, data: any) {
    return this.http.put(`http://localhost:8000/room/updateRoom/${id}`, data);
  }

  deleteHotel(id: any) {
    return this.http.delete(`http://localhost:8000/hotel/delete/${id}`);
  }

  cancelBooking(data: any) {
    console.log(data);
    return this.http.post('http://localhost:8000/room/cancelBooking', data);
  }
  // Admin Hotel
  getHotelByAdmin(admin: any) {
    return this.http.get(
      `http://localhost:8000/hotel/getHotelByAdmin/${admin}`
    );
  }
}
