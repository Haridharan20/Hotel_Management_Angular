import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  condition = true;
  disablehotel = false;

  @ViewChild('view') viewEle: ElementRef | null = null;
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
    this.viewEle?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  filterName(event: any) {
    this.filtername = (<HTMLInputElement>event.target).value;
  }

  call() {
    this.viewEle?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
