import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HotelCreationComponent } from './hotel-creation/hotel-creation.component';
import { RoomCreationComponent } from './room-creation/room-creation.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyHotelComponent } from './my-hotel/my-hotel.component';

@NgModule({
  declarations: [
    HotelCreationComponent,
    RoomCreationComponent,
    MyHotelComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule],
})
export class AdminModule {}
