import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { HotelCreationComponent } from './hotel-creation/hotel-creation.component';
import { MyHotelComponent } from './my-hotel/my-hotel.component';
import { RoomCreationComponent } from './room-creation/room-creation.component';

const routes: Routes = [
  {
    path: 'createHotel',
    component: HotelCreationComponent,
  },
  {
    path: 'myHotel',
    component: MyHotelComponent,
  },
  {
    path: 'createRoom/:id',
    component: RoomCreationComponent,
  },
  {
    path: 'editHotel/:id',
    component: EditHotelComponent,
  },
  {
    path: 'editRoom/:id',
    component: EditRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
