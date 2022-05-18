import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
})
export class HotelDetailComponent implements OnInit {
  filter!: any;
  hotelId!: any;
  rooms: any[] = [];
  inDate!: string;
  outDate!: string;
  filterString = '';
  hotelDetails!: any;
  checkArr: any = [];
  today = new Date().toISOString().split('T')[0];

  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private toastr: ToastrService
  ) {}

  checkInForm = this.form.group({});

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
    console.log(new Date(this.inDate).getTime());
  }

  chooseOutDate(event: any) {
    this.outDate = (<HTMLInputElement>event.target).value;
    console.log(new Date(this.outDate).getTime());
  }

  availHotel() {
    if (this.outDate == undefined || this.inDate == undefined) {
      this.toastr.error('Enter checkIn or checkOut Date', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }
    if (new Date(this.outDate).getTime() <= new Date(this.inDate).getTime()) {
      this.toastr.error('Enter valid checkOut Date', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }
    this.hotelService.getHotelRooms(this.hotelId).subscribe({
      next: (result) => {
        this.rooms = result.filter((room: any) => {
          var flag = 1;
          room.bookings.forEach((date: any) => {
            console.log(date);
            let from = new Date(date.from);
            let to = new Date(date.to);
            if (
              this.dateRangeOverlaps(
                from.getTime(),
                to.getTime(),
                new Date(this.inDate).getTime(),
                new Date(this.outDate).getTime()
              )
            ) {
              console.log('overlapping');
              flag = 0;
            }
          });
          if (flag == 1) {
            return room;
          }
        });
      },
    });
  }
  dateRangeOverlaps(
    a_start: any,
    a_end: any,
    b_start: any,
    b_end: any
  ): boolean {
    if (a_start <= b_start && b_start <= a_end) return true;
    if (a_start <= b_end && b_end <= a_end) return true;
    if (b_start < a_start && a_end < b_end) return true;
    return false;
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
