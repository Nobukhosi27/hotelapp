import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Booking } from '../../../shared/bookings';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  imports: [FormsModule, CommonModule,  NgIf], 
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements OnInit {
  bookingId: string | null = null;
  booking: Booking | null = null;

  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
   
    this.route.paramMap.subscribe((params) => {
      this.bookingId = params.get('bookingId');
      if (this.bookingId) {
        this.loadBookingDetails(this.bookingId);
      }
    });
  }

 
  async loadBookingDetails(bookingId: string) {
    try {
      const bookingRef = doc(this.firestore, 'bookings', bookingId);
      const bookingSnap = await getDoc(bookingRef);
      if (bookingSnap.exists()) {
        this.booking = bookingSnap.data() as Booking;
      } else {
        console.error('Booking not found');
      }
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  }
  async cancelBooking() {
    if (!this.booking || !this.bookingId) {
      console.error('No booking found to cancel');
      return;
    }

    try {
   
      const bookingRef = doc(this.firestore, 'bookings', this.bookingId);
      await deleteDoc(bookingRef);

      
      const roomRef = doc(this.firestore, 'rooms', this.booking.roomId);
      await updateDoc(roomRef, { isAvailable: true });

      console.log('Booking canceled successfully!');

     
      this.router.navigate(['/room-list']);
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  }
}
