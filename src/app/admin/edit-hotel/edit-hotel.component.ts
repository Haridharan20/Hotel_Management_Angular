import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.css'],
})
export class EditHotelComponent implements OnInit {
  hotelId!: any;
  rooms: any = [];
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((val) => {
      this.hotelId = val['id'];
      // console.log(this.hotelId);
      this.hotelService.getHotelRooms(this.hotelId).subscribe({
        next: (result: any) => {
          // console.log(result);
          this.rooms = result;
        },
      });
    });
  }

  ngOnInit(): void {}

  deleteRoom(roomId: any) {
    // console.log(roomId);
    this.hotelService.deleteRoom(roomId).subscribe({
      next: (result: any) => {
        // console.log(result);
      },
    });
    this.hotelService.deleteRoomFromHotel(this.hotelId, roomId).subscribe({
      next: (result: any) => {
        // console.log(result);
      },
    });
    this.toastr.success('Room Deleted successfully', '', {
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
    this.router.navigate([`/admin/editHotel/${this.hotelId}`]).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }
}
