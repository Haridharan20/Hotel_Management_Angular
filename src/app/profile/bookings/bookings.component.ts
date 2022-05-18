import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  currentDate = new Date();
  bookings: any = [];
  constructor(
    private authService: AuthService,
    private hotelService: HotelService,
    private userService: UserService,
    private toastr: ToastrService,
    private route: Router
  ) {}
  ngOnInit(): void {
    console.log('init');
    this.userService.getProfile().subscribe({
      next: (result: any) => {
        console.log(result);
        this.bookings = result.bookings.reverse();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  calculateCancel(Bookingfrom: any) {
    if (this.currentDate.getTime() < new Date(Bookingfrom).getTime()) {
      return true;
    }
    return false;
  }

  cancelBooking(from: any, to: any, roomId: any, bookingDate: any) {
    let userId = localStorage.getItem('uid');
    let data = {
      from,
      to,
      userId,
      roomId,
    };

    this.userService
      .updateMyBooking({ bookingDate, roomId, userId, from, to })
      .subscribe({
        next: (result: any) => {
          console.log(result);
        },
      });

    this.hotelService.cancelBooking(data).subscribe({
      next: (result: any) => {
        console.log(result);
      },
    });

    this.toastr.success('Cancel successfully', '', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
    // this.route.navigate(['/profile/booking']);
    this.route.navigate(['/profile/booking']).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
}
