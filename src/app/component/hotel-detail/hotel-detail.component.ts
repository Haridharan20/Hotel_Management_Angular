import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentService } from 'src/app/services/component.service';
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
  filterString = '';
  hotelDetails!: any;
  checkArr: any = [];
  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id');
    console.log(this.hotelId);
    this.hotelService.getHotelRooms(this.hotelId).subscribe({
      next: (result) => {
        console.log(result);
        this.rooms = result;
      },
    });

    this.hotelService.getHotel(this.hotelId).subscribe({
      next: (result) => {
        console.log('Hotel', result);
        this.hotelDetails = result;
      },
    });
  }

  filterName(event: any) {
    console.log('up');
    this.filterString = (<HTMLInputElement>event.target).value;
  }

  chooseInDate(event: any) {
    this.inDate = (<HTMLInputElement>event.target).value;
    console.log(this.inDate);
  }

  chooseOutDate(event: any) {
    this.outDate = (<HTMLInputElement>event.target).value;
  }

  checkEvent(event: any) {
    let val = (<HTMLInputElement>event.target).value;
    if (<HTMLInputElement>event.target.checked) {
      this.checkArr.push(val);
    } else {
      let index = this.checkArr.indexOf(val);
      this.checkArr.splice(index, 1);
    }
    console.log(this.checkArr);
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
