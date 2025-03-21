import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { ManageRoomsComponent } from './components/manage-rooms/manage-rooms.component';
import { ManageBookingsComponent } from './components/manage-bookings/manage-bookings.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NavbarComponent } from './components/navbar/navbar.component';


export const routes: Routes = [
    { path: 'admin-dashboard', component: AdminDashboardComponent  ,canActivate: [authGuard]},
    { path: 'user-dashboard', component: UserDashboardComponent },
    {path:'register' , component:RegisterComponent},
    { path: 'room-list', component: RoomListComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'booking-details/:bookingId', component: BookingDetailsComponent },
    {path:'manage-rooms' , component:ManageRoomsComponent, canActivate: [authGuard],},
    {path:'manage-bookings' , component:ManageBookingsComponent, canActivate: [authGuard]},
    {path:'room-details' , component:RoomDetailsComponent},
    {path:'feedback' , component:FeedbackFormComponent},
    {path:'payment' , component:PaymentComponent},
    {path:'navbar' , component:NavbarComponent},
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
   
];
