import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotelapp';
}
