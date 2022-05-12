import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
