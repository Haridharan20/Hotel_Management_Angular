import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css'],
})
export class HotelComponent implements OnInit {
  constructor(private form: FormBuilder, private hotelService: HotelService) {}

  ngOnInit(): void {}
  hotelForm = this.form.group({
    hotelname: ['', Validators.required],
  });

  onSubmit() {
    const { hotelname } = this.hotelForm.value;
    this.hotelService.createHotel(hotelname).subscribe((result) => {
      console.log(result);
    });
  }
}
