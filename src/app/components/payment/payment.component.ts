import { Component, inject } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-payment',
   imports: [CommonModule],
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  private paymentService = inject(PaymentService);
  paymentId: string | null = null;

  async makePayment() {
    this.paymentId = await this.paymentService.processPayment(100, 'test-booking-id');
  }
}
