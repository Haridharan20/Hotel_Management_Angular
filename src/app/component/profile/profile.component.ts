import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  Username!: string;
  bookings: any = [];
  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    console.log('init');
    this.userService.getProfile().subscribe({
      next: (result: any) => {
        console.log(result);
        this.Username = result.name;
        this.bookings = result.bookings;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
