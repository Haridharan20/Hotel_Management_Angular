import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  private hotelSource = new Subject<any>();
  hotelMessage = this.hotelSource.asObservable();
  constructor() {}

  sendMessage(message: any) {
    this.hotelSource.next(message);
  }
}
