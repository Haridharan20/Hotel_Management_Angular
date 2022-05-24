import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  User!: any;
  name!: any;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('init');
    this.userService.getProfile().subscribe({
      next: (result: any) => {
        console.log(result);
        this.User = result;
        this.name = result.name;
        console.log(this.User, this.name);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateUserInfo(event: any) {
    event.preventDefault();
    console.log(event);
  }
}
