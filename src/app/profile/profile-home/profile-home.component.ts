import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css'],
})
export class ProfileHomeComponent implements OnInit {
  pic!: any;
  constructor(public service: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    if (!this.service.loggedIn()) {
      this.pic = localStorage.getItem('pic') || '';
    }
  }

  onLogout() {
    this.service.logout();
    this.toastr.success('Logout successfully', '', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
}
