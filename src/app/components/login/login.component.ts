import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  email = '';
  password = '';

  login() {
    this.authService.login(this.email, this.password).then(role => {
      if (role === 'admin') {
        this.router.navigate(['/admin-dashboard']); 
      } else if (role === 'guest') {
        this.router.navigate(['/user-dashboard']); 
      } else {
        console.error('No role assigned, cannot log in');
      }
    }).catch(err => console.error('Login failed:', err));
  }
  
  forgotPassword() {
    if (!this.email) {
      alert('Please enter your email to reset your password.');
      return;
    }

    this.authService.forgotPassword(this.email)
      .then(() => alert('Password reset link sent! Check your email.'))
      .catch(err => console.error('Error sending reset email:', err));
  }
}
