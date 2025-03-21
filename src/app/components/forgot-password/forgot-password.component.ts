import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  email = '';

  resetPassword() {
    this.authService.forgotPassword(this.email)
      .then(() => {
        alert('Password reset email sent! Check your inbox.');
        this.router.navigate(['/login']);
      })
      .catch(err => console.error('Error sending reset email:', err));
  }
}
