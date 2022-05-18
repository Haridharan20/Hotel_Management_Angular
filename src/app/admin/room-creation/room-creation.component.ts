import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-room-creation',
  templateUrl: './room-creation.component.html',
  styleUrls: ['./room-creation.component.css'],
})
export class RoomCreationComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {}

  createRoom = this.form.group({
    roomtype: ['', Validators.required],
    capacity: ['', Validators.required],
    price: ['', Validators.required],
  });

  onSubmit() {
    let hotel_id = this.route.snapshot.paramMap.get('id');
    const { roomtype, capacity, price } = this.createRoom.value;
    let room = {
      hotel_id,
      roomtype,
      capacity,
      price,
    };
    let roomId!: string;
    this.hotelService.createRoom(room).subscribe(async (result: any) => {
      roomId = await result.roomid;
      console.log('roomid', roomId);
      this.hotelService
        .updateHotel(hotel_id, roomId)
        .subscribe((result: any) => {
          console.log('update', result);
        });
      this.router.navigate([`/admin/editHotel/${hotel_id}`]);
      // console.log(roomId);
    });
  }
}
