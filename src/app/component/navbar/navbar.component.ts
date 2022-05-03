import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userName!: string;
  constructor(public service: LoginService) {}

  ngOnInit(): void {
    if (!this.service.loggedIn()) {
      this.userName = localStorage.getItem('user') || '';
    }
  }

  onLogout() {
    this.service.logout();
  }
}
