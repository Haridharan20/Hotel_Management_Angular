import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.css'],
})
export class MyHotelComponent implements OnInit {
  hotelArr: any[] = [];
  constructor(
    private hotelService: HotelService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let admin = localStorage.getItem('uid');
    // console.log(admin);
    this.hotelService.getHotelByAdmin(admin).subscribe({
      next: (result: any) => {
        this.hotelArr = result;
      },
    });
  }

  deleteHotel(id: any) {
    this.hotelService.deleteHotel(id).subscribe({
      next: (result: any) => {
        // console.log(result);
      },
    });
    this.hotelService.deleteAllRooms(id).subscribe({
      next: (result: any) => {
        // console.log(result);
      },
    });
    this.toastr.success('Hotel Deleted successfully', '', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
    this.ngOnInit();
  }
}
