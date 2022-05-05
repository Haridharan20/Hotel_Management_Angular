import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  searchRating!: '';
  filtername: string = '';
  filteredHotels: any[] = [];
  constructor(private form: FormBuilder, private hotelService: HotelService) {}

  ngOnInit(): void {}
  searchForm = this.form.group({
    location: ['', Validators.required],
    rating: [''],
  });

  searchHotel() {
    console.log(this.searchForm.value);
    const { location } = this.searchForm.value;
    let city = location.toLowerCase();
    this.hotelService.getHotelByCity(city).subscribe((result: any) => {
      console.log(result);
      this.filteredHotels = result;
    });
  }

  // filterByStar(event: any) {
  //   console.log((<HTMLInputElement>event.target).value);
  // }

  filterName(event: any) {
    this.filtername = (<HTMLInputElement>event.target).value;
  }
}
