import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
})
export class HotelDetailComponent implements OnInit {
  hotelId!: any;
  rooms: any[] = [];
  inDate!: String;
  outDate!: String;
  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {}

  chooseInDate(event: any) {
    this.inDate = (<HTMLInputElement>event.target).value;
    console.log(this.inDate);
  }

  chooseOutDate(event: any) {
    this.outDate = (<HTMLInputElement>event.target).value;
  }
}

// let date1 = '2022-05-22'
// let date2 ='2022-05-24'
// let indate= new Date(date1);
// let outdate=new Date(date2);

// console.log(indate)

// let result = arr.filter(room=>{
//   let availStart=new Date(room.dates[0].start)
//   let availEnd = new Date(room.dates[0].end)
//   console.log(availStart,availEnd)
//   if(indate>=availStart && outdate<=availEnd)
//   {
//     // console.log("yes")
//     return room
//   }
// })

// console.log(result)
