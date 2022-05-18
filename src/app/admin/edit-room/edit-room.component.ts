import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit {
  roomId!: any;
  roomType!: any;
  roomCapacity!: any;
  roomPrice!: any;
  hotelId!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.roomId = val['id'];
    });
    console.log(this.roomId);
    this.hotelService.getRoom(this.roomId).subscribe({
      next: (result: any) => {
        console.log(result);
        this.roomType = result.roomtype;
        this.roomCapacity = result.capacity;
        this.roomPrice = result.price;
        this.hotelId = result.hotel_id;
      },
    });
  }
  onSubmit() {
    let data = {
      roomtype: this.roomType,
      capacity: this.roomCapacity,
      price: this.roomPrice,
    };
    this.hotelService.updateRoom(this.roomId, data).subscribe({
      next: (result: any) => {
        console.log(result);
        this.toastr.success('Room Update successfully', '', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.router.navigate([`admin/editHotel/${this.hotelId}`]).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
      },
    });
  }
}
