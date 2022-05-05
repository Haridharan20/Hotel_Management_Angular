import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})
export class CreateRoomComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {}
  RoomForm = this.form.group({
    Roomname: ['', Validators.required],
  });

  async onSubmit() {
    const { Roomname } = this.RoomForm.value;
    let hotelid = this.route.snapshot.paramMap.get('id');
    console.log('before', hotelid);
    let roomId!: string;
    await this.hotelService
      .createRoom(hotelid, Roomname)
      .subscribe(async (result: any) => {
        roomId = await result.roomid;
        console.log('roomid', roomId);
        this.hotelService
          .updateHotel(hotelid, roomId)
          .subscribe((result: any) => {
            console.log('update', result);
          });
        // console.log(roomId);
      });
    // await this.hotelService.getHotel(hotelid).subscribe(async (result: any) => {
    //   oldRooms = await result.rooms;
    //   oldRooms.push(roomId);
    //   console.log(oldRooms);
    //   this.hotelService
    //     .updateHotel(hotelid, oldRooms)
    //     .subscribe((result: any) => {
    //       console.log('update', result);
    //     });
    // });
  }
}
