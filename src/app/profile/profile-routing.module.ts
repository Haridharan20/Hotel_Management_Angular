import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { InfoComponent } from './info/info.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileHomeComponent,
    children: [
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'booking',
        component: BookingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
