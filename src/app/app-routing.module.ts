import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './Auth/auth-guard.guard';
import { CreateRoomComponent } from './component/create-room/create-room.component';
import { HotelDetailComponent } from './component/hotel-detail/hotel-detail.component';
import { HotelComponent } from './component/hotel/hotel.component';
import { HoteldetailsComponent } from './component/hoteldetails/hoteldetails.component';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { RegisterComponent } from './component/register/register.component';
import { RoomDetailComponent } from './component/room-detail/room-detail.component';
import { WelcomeComponent } from './component/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'createHotel',
    component: HotelComponent,
  },
  {
    path: 'hotelDetail/:id',
    component: HotelDetailComponent,
  },

  {
    path: 'roomDetail/:hotel/:id',
    component: RoomDetailComponent,
  },

  {
    path: 'create/:id',
    component: CreateRoomComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
