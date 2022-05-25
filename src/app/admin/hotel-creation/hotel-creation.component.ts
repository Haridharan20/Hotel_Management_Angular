import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-creation',
  templateUrl: './hotel-creation.component.html',
  styleUrls: ['./hotel-creation.component.css'],
})
export class HotelCreationComponent implements OnInit {
  hotelImage!: any;
  constructor(
    private form: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  creationForm = this.form.group({
    hotelname: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    phone: ['', Validators.required],
  });

  fileChoosen(event: any) {
    console.log(event.target.value);
    if (event.target.value) {
      this.hotelImage = <File>event.target.files;
      // console.log(this.hotelImage);
    }
  }

  onSubmit() {
    const { hotelname, address, city, state, zip, phone } =
      this.creationForm.value;
    let admin_id = localStorage.getItem('uid') || '';

    let fd = new FormData();
    fd.append('admin_id', admin_id);
    fd.append('hotelname', hotelname);
    fd.append('address', address);
    fd.append('city', city.toLowerCase());
    fd.append('state', state), fd.append('zip', zip);
    fd.append('phone', phone);
    for (let i = 0; i < this.hotelImage.length; i++) {
      fd.append('images', this.hotelImage[i]);
    }
    this.hotelService.createHotel(fd).subscribe({
      next: (res) => {
        this.toastr.success('Hotel created successfully', '', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.router.navigate(['/profile/myHotels']);
      },
      error: (err) => {
        this.toastr.error('Phone number already in use', '', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      },
    });
  }
}
