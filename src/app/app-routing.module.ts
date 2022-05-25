import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './Guard/Auth/auth-guard.guard';
import { HotelDetailComponent } from './component/hotel-detail/hotel-detail.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { RoomDetailComponent } from './component/room-detail/room-detail.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { AdminGuardGuard } from './Guard/AdminAuth/admin-guard.guard';

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
    path: 'hotelDetail/:id',
    component: HotelDetailComponent,
  },

  {
    path: 'roomDetail/:hotel/:id',
    component: RoomDetailComponent,
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((module) => module.ProfileModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),
    canActivate: [AdminGuardGuard],
  },
  {
    path: '**',
    component: WelcomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
