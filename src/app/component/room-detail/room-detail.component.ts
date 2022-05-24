import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

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
  checkin: any;
  checkout: any;
  today = new Date().toISOString().split('T')[0];

  paymentHandler: any = null;

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((val) => {
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
    this.invokeStripe();
    console.log(this.checkout);
    this.route.queryParams.subscribe((params) => {
      this.checkin = params['checkin'];
      this.checkout = params['checkOut'];
      console.log(this.checkin);
      this.calculateNight();
    });
  }

  calculateNight() {
    let timeDiff = Math.abs(
      new Date(this.checkin).getTime() - new Date(this.checkout).getTime()
    );
    this.nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  bookRoom(type: string, price: any, nights: any) {
    let url;
    let totalamount;
    this.route.params.subscribe((val) => {
      localStorage.setItem('url', `/roomDetail/${val['hotel']}/${val['id']}`);
    });
    if (!this.checkAvail()) {
      return;
    }
    if (!this.authService.loggedIn()) {
      totalamount = price * nights + 357;
      const bookingData = {
        Hotelname: this.name,
        roomId: this.roomId,
        RoomType: type,
        Date: {
          from: this.checkin,
          to: this.checkout,
        },
        amount: totalamount,
        bookedOn: new Date().toLocaleDateString(),
      };
      let uid = localStorage.getItem('uid');
      this.makePayment(totalamount, uid, bookingData);
    } else {
      this.toastr.warning('Login to Book', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      this.router.navigate(['/login']);
    }
  }

  checkAvail(): boolean {
    if (this.checkout == undefined || this.checkin == undefined) {
      this.toastr.error('Enter checkIn or checkOut Date', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return false;
    }
    if (new Date(this.checkout).getTime() <= new Date(this.checkin).getTime()) {
      this.toastr.error('Enter valid checkOut Date', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return false;
    }
    console.log('avail');
    let flag = 1;
    this.room.bookings.forEach((date: any) => {
      console.log(date);
      let from = new Date(date.from);
      let to = new Date(date.to);
      if (
        this.dateRangeOverlaps(
          from.getTime(),
          to.getTime(),
          new Date(this.checkin).getTime(),
          new Date(this.checkout).getTime()
        )
      ) {
        console.log('overlapping');
        flag = 0;
      }
    });
    if (flag == 1) {
      return true;
    } else {
      this.toastr.error('No Rooms are available on the date', '', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return false;
    }
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

  makePayment(amount: any, uid: any, bookingData: any): any {
    this.paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L2UI8SH6CJX8bgna0a8MjDxwFa7iIUjVLaRBKFWSYb9kXnlSd0d4Vam1vaT4BBZGwGj11sdrsSZlp9SVnrog1eM00u3SlutCL',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken.card.name);
        payment(stripeToken.id, stripeToken.card.name);
      },
    });
    const payment = (token: any, name: any) => {
      this.userService.payment(token, amount * 100, name).subscribe({
        next: (res: any) => {
          if (res.value) {
            this.hotelService
              .updateBooking(this.roomId, {
                from: this.checkin,
                to: this.checkout,
                user: uid,
              })
              .subscribe({
                next: (res) => {
                  console.log(res);
                },
              });
            this.userService.addMyBooking(bookingData).subscribe({
              next: (request: any) => {
                this.toastr.success('Booking successfully', '', {
                  timeOut: 1000,
                  progressBar: true,
                  progressAnimation: 'decreasing',
                });
                setTimeout(() => {
                  this.router.navigate(['/profile/booking']);
                }, 1500);
              },
            });
          } else {
            this.toastr.error('Payment Failed', '', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'decreasing',
            });
          }
        },
      });
    };

    this.paymentHandler.open({
      name: 'HD',
      description: 'Payment For Room  Booking',
      currency: 'inr',
      amount: Number(amount) * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
