import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings: any = [];
  constructor(private userService: AuthService) {}
  ngOnInit(): void {
    console.log('init');
    this.userService.getProfile().subscribe({
      next: (result: any) => {
        console.log(result);
        this.bookings = result.bookings;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
