import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hoteldetails',
  templateUrl: './hoteldetails.component.html',
  styleUrls: ['./hoteldetails.component.css'],
})
export class HoteldetailsComponent implements OnInit {
  hotelArr: any[] = [];
  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.getAllHotel().subscribe((result) => {
      this.hotelArr = result;
      console.log('arr', this.hotelArr);
    });
  }
}
