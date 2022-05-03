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
  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (result: any) => {
        console.log(result.name);
        this.Username = result.name;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
