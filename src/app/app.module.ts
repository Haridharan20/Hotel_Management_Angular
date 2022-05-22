import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardGuard } from './Guard/Auth/auth-guard.guard';
import { AuthService } from './services/auth.service';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { HotelDetailComponent } from './component/hotel-detail/hotel-detail.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DatePipe } from './pipes/date.pipe';
import { RoomtypePipe } from './pipes/roomtype.pipe';
import { RoomComponent } from './component/room/room.component';
import { RoomsharingPipe } from './pipes/roomsharing.pipe';
import { RoomDetailComponent } from './component/room-detail/room-detail.component';
import { InterceptorServiceService } from './interceptor/interceptor-service.service';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    HotelDetailComponent,
    FilterPipe,
    DatePipe,
    RoomtypePipe,
    RoomComponent,
    RoomsharingPipe,
    RoomDetailComponent,
    FooterComponent,
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
  providers: [
    AuthGuardGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorServiceService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
