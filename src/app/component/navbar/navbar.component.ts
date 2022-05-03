import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userName!: any;
  constructor(public service: AuthService, private toastr: ToastrService) {}
  ngOnInit(): void {
    if (!this.service.loggedIn()) {
      this.userName = localStorage.getItem('user') || '';
    }
  }

  onLogout() {
    this.service.logout();
    this.userName = null;
    this.toastr.success('Logout successfully', '', {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
}
