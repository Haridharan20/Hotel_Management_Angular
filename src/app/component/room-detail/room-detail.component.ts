import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
})
export class RoomDetailComponent implements OnInit {
  roomId!: any;
  room: any = [];
  name!: any;
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((val) => {
      this.roomId = val['id'];
      this.name = val['hotel'];
      this.hotelService.getRoom(this.roomId).subscribe({
        next: (result) => {
          console.log(result);
          this.room = result;
        },
      });
    });
  }

  ngOnInit(): void {}
}
