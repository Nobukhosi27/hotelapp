import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  async logout() { 
    try {
      await signOut(this.auth);
      console.log('Logout successful');
      this.router.navigate(['/login']); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }


  
}
