import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './component/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardGuard } from './Auth/auth-guard.guard';
import { AuthService } from './services/auth.service';
import { HotelComponent } from './component/hotel/hotel.component';
import { HoteldetailsComponent } from './component/hoteldetails/hoteldetails.component';
import { HotelAdminComponent } from './component/hotel-admin/hotel-admin.component';
import { CreateRoomComponent } from './component/create-room/create-room.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { HotelDetailComponent } from './component/hotel-detail/hotel-detail.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DatePipe } from './pipes/date.pipe';
import { RoomtypePipe } from './pipes/roomtype.pipe';
import { RoomComponent } from './component/room/room.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HotelComponent,
    HoteldetailsComponent,
    HotelAdminComponent,
    CreateRoomComponent,
    WelcomeComponent,
    HotelDetailComponent,
    FilterPipe,
    DatePipe,
    RoomtypePipe,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',

      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [AuthGuardGuard, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
