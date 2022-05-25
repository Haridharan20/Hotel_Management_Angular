import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HotelCreationComponent } from './hotel-creation/hotel-creation.component';
import { RoomCreationComponent } from './room-creation/room-creation.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyHotelComponent } from './my-hotel/my-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { EditRoomComponent } from './edit-room/edit-room.component';

@NgModule({
  declarations: [
    HotelCreationComponent,
    RoomCreationComponent,
    MyHotelComponent,
    EditHotelComponent,
    EditRoomComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, FormsModule],
})
export class AdminModule {}
