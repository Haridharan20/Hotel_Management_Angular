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

  onSubmit() {
    const { hotelname, address, city, state, zip, phone } =
      this.creationForm.value;
    let admin_id = localStorage.getItem('uid');
    let hotel = {
      admin_id,
      hotelname,
      address,
      city: city.toLowerCase(),
      state,
      zip,
      phone,
    };
    console.log(hotel);
    this.hotelService.createHotel(hotel).subscribe({
      next: (res) => {
        {
          console.log(res);
        }
      },
    });
    this.toastr.success('Hotel created successfully', '', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
    this.router.navigate(['/profile/myHotels']).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
}
