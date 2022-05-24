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
  address!: any;
  profile!: any;
  image!: any;

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
        this.address = result.address;
        this.image = result.image[0]?.filename;
        console.log(this.image);
        localStorage.setItem('pic', this.image);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  fileChoosen(event: any) {
    console.log(event.target.value);
    if (event.target.value) {
      this.profile = <File>event.target.files[0];
    }
  }

  updateUserInfo(event: any) {
    event.preventDefault();
    console.log(this.profile);
    let fd = new FormData();
    fd.append('name', this.name);
    fd.append('email', this.User.email);
    fd.append('phone', this.User.phone);
    fd.append('address', this.address);
    fd.append('image', this.profile);
    this.userService.updateProfile(fd).subscribe({
      next: (result: any) => {
        console.log(result);
        event.target.elements[4].value = null;
        this.ngOnInit();
      },
    });
  }
}
