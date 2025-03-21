import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Booking } from '../../../shared/bookings';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.css'],
})
export class ManageBookingsComponent implements OnInit {
  private firestore = inject(Firestore);
  bookings$: Observable<Booking[]>; // Observable for Firestore bookings
  bookings: Booking[] = [];

  constructor() {
    const bookingsCollection = collection(this.firestore, 'bookings');
    this.bookings$ = collectionData(bookingsCollection, { idField: 'id' }) as Observable<Booking[]>;
  }

  ngOnInit() {
    this.bookings$.subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  
  async cancelBooking(bookingId: string) {
    if (!bookingId) return;

    const bookingRef = doc(this.firestore, 'bookings', bookingId);
    await deleteDoc(bookingRef);
    console.log('Booking canceled successfully');
  }

  
  async checkIn(booking: Booking) {
    if (!booking.id) return;

    const bookingRef = doc(this.firestore, 'bookings', booking.id);
    await updateDoc(bookingRef, { checkIn: new Date() });
    console.log('Guest checked in');
  }

  
  async checkOut(booking: Booking) {
    if (!booking.id) return;

    const bookingRef = doc(this.firestore, 'bookings', booking.id);
    await updateDoc(bookingRef, { checkOut: new Date() });
    console.log('Guest checked out');
  }
}
