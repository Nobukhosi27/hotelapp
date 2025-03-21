import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule,RouterLink],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private authService = inject(AuthService);
  email = '';
  password = '';
  role = 'guest'; 

  register() {
    this.authService.register(this.email, this.password, this.role)
      .then(() => console.log('Registration successful'))
      .catch(err => console.error('Error:', err));
  }
}
