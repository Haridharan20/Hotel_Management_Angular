import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  User!: any;

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    console.log('init');
    this.userService.getProfile().subscribe({
      next: (result: any) => {
        console.log(result);
        this.User = result;
        console.log(this.User);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
