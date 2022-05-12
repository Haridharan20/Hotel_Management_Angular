import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
})
export class RoomDetailComponent implements OnInit {
  roomId!: any;
  room: any = [];
  name!: any;
  nights: any = 1;
  amount!: any;
  currentDate: any = new Date();
  checkin: any = this.currentDate.toISOString().split('T')[0];
  checkout: any = new Date(
    this.currentDate.setDate(this.currentDate.getDate() + 1)
  )
    .toISOString()
    .split('T')[0];

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    route.params.subscribe((val) => {
      this.roomId = val['id'];
      this.name = val['hotel'];
      this.hotelService.getRoom(this.roomId).subscribe({
        next: (result) => {
          console.log(result);
          this.room = result;
        },
      });
    });
  }

  ngOnInit(): void {
    console.log(this.checkout);
  }

  calculateNight() {
    let timeDiff = Math.abs(
      new Date(this.checkin).getTime() - new Date(this.checkout).getTime()
    );
    this.nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  bookRoom(type: string, price: any, nights: any) {
    if (!this.authService.loggedIn()) {
      const bookingData = {
        Hotelname: this.name,
        RoomType: type,
        Date: {
          from: this.checkin,
          to: this.checkout,
        },
        amount: price * nights + 357,
      };
      this.authService.addMyBooking(bookingData).subscribe({
        next: (request: any) => {
          console.log('request');
        },
      });
    } else {
      this.toastr.warning('Login to Book', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      this.router.navigate(['/login']);
    }
  }
}
