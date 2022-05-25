import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-room-creation',
  templateUrl: './room-creation.component.html',
  styleUrls: ['./room-creation.component.css'],
})
export class RoomCreationComponent implements OnInit {
  roomImage!: any;
  constructor(
    private form: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {}

  createRoom = this.form.group({
    roomtype: ['', Validators.required],
    capacity: ['', Validators.required],
    price: ['', Validators.required],
    offer: ['0', Validators.required],
  });

  fileChoosen(event: any) {
    console.log(event.target.value);
    if (event.target.value) {
      this.roomImage = <File>event.target.files;
      // console.log(this.roomImage);
    }
  }

  onSubmit() {
    let hotel_id = this.route.snapshot.paramMap.get('id') || '';
    const { roomtype, capacity, price, offer } = this.createRoom.value;
    let fd = new FormData();
    fd.append('hotel_id', hotel_id);
    fd.append('roomtype', roomtype);
    fd.append('capacity', capacity);
    fd.append('price', price);
    fd.append('offer', offer);

    for (let i = 0; i < this.roomImage.length; i++) {
      fd.append('images', this.roomImage[i]);
    }
    let roomId!: string;
    this.hotelService.createRoom(fd).subscribe(async (result: any) => {
      roomId = await result.roomid;
      // console.log('roomid', roomId);
      this.hotelService
        .updateHotel(hotel_id, roomId)
        .subscribe((result: any) => {
          // console.log('update', result);
          this.toastr.success('Room Created successfully', '', {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'decreasing',
          });
        });
      this.router.navigate([`/admin/editHotel/${hotel_id}`]);
      // console.log(roomId);
    });
  }
}
