import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.css'],
})
export class MyHotelComponent implements OnInit {
  hotelArr: any[] = [];
  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    let admin = localStorage.getItem('uid');
    console.log(admin);
    this.hotelService.getHotelByAdmin(admin).subscribe({
      next: (result: any) => {
        this.hotelArr = result;
      },
    });
  }
}
