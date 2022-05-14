import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { InfoComponent } from './info/info.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [InfoComponent, BookingsComponent, ProfileHomeComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
})
export class ProfileModule {}
