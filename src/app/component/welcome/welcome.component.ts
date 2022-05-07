import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentService } from 'src/app/services/component.service';
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
  condition = true;
  disablehotel = false;

  constructor(
    private form: FormBuilder,
    private hotelService: HotelService,
    private componentService: ComponentService
  ) {}

  ngOnInit(): void {}
  searchForm = this.form.group({
    location: ['', Validators.required],
    rating: [''],
  });

  searchHotel() {
    window.scrollTo({
      top: 800,
      left: 0,
      behavior: 'smooth',
    });
    console.log(this.searchForm.value);
    const { location } = this.searchForm.value;
    let city = location.toLowerCase();
    this.hotelService.getHotelByCity(city).subscribe((result: any) => {
      console.log(result);
      this.filteredHotels = result;
    });
  }

  sendDetails(hotel: any) {
    this.componentService.sendMessage(hotel);
  }

  // filterByStar(event: any) {
  //   console.log((<HTMLInputElement>event.target).value);
  // }

  filterName(event: any) {
    this.filtername = (<HTMLInputElement>event.target).value;
  }
}
