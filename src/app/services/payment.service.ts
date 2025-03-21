import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private firestore = inject(Firestore);
  stripePromise: Promise<Stripe | null> = loadStripe('your-stripe-publishable-key');

  async processPayment(amount: number, bookingId: string): Promise<string | null> {  
    const stripe = await this.stripePromise;

    if (!stripe) {
      console.error('Stripe failed to load');
      return null; 
    }

    const paymentData = { amount, currency: 'usd', bookingId, status: 'pending' };

    try {
      // Store payment in Firestore (mock processing)
      const paymentRef = collection(this.firestore, 'payments');
      const docRef = await addDoc(paymentRef, paymentData);
      
      console.log('Payment initialized with ID:', docRef.id);
      return docRef.id; 
    } catch (error) {
      console.error('Payment processing failed:', error);
      return null; 
    }
  }
}
