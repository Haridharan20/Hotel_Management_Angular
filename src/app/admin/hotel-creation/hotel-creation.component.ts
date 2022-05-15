import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel-creation',
  templateUrl: './hotel-creation.component.html',
  styleUrls: ['./hotel-creation.component.css'],
})
export class HotelCreationComponent implements OnInit {
  constructor(private form: FormBuilder, private hotelService: HotelService) {}

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
      city,
      state,
      zip,
      phone,
    };
    this.hotelService.createHotel(hotel).subscribe({
      next: (res) => {
        {
          console.log(res);
        }
      },
    });
  }
}
