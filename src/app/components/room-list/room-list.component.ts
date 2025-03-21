import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, addDoc, getDocs, query, where, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Room } from '../../../shared/room';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-room-list',
  imports: [FormsModule, CommonModule, NgFor, NgIf, RouterLink], 
  standalone: true,
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);
  private paymentService = inject(PaymentService);

  rooms$: Observable<Room[]>;
  allRooms: Room[] = []; 
  filteredRooms: Room[] = []; 
  userBookingId: string | null = null; 

  // Search and filter parameters
  searchType: string = '';
  maxPrice: number | null = null;
  minCapacity: number | null = null;

  constructor() {
    this.rooms$ = new Observable<Room[]>(); 
  }

  ngOnInit() {
    const roomCollection = collection(this.firestore, 'rooms');
    this.rooms$ = collectionData(roomCollection, { idField: 'id' }) as Observable<Room[]>;

    this.rooms$.subscribe((rooms) => {
      this.allRooms = rooms.map(room => ({
        ...room,
        amenities: room.amenities || [] 
      }));
      this.filteredRooms = this.allRooms;
    });

    this.checkUserBooking();
  }


  filterRooms() {
    this.filteredRooms = this.allRooms.filter(room => {
      return (
        (!this.searchType || room.type.toLowerCase().includes(this.searchType.toLowerCase())) &&
        (!this.maxPrice || room.price <= this.maxPrice) &&
        (!this.minCapacity || room.capacity >= this.minCapacity)
      );
    });
  }

  async checkUserBooking() {
    if (!this.auth.currentUser) return;

    const userId = this.auth.currentUser.uid;
    const bookingsCollection = collection(this.firestore, 'bookings');
    const bookingQuery = query(bookingsCollection, where('userId', '==', userId));

    try {
      const querySnapshot = await getDocs(bookingQuery);
      if (!querySnapshot.empty) {
        this.userBookingId = querySnapshot.docs[0].id;
      }
    } catch (error) {
      console.error('Error checking user booking:', error);
    }
  }

  async bookRoom(room: Room) {
    if (!room.id || !this.auth.currentUser) {
      console.error('Error: Missing room ID or user not logged in');
      return;
    }

    const userId = this.auth.currentUser.uid;
    const bookingData = {
      userId,
      roomId: room.id,
      type: room.type,
      price: room.price,
      bookedAt: Timestamp.now(),
    };

    try {
      
      const bookingsCollection = collection(this.firestore, 'bookings');
      const bookingRef = await addDoc(bookingsCollection, bookingData);
      const bookingId = bookingRef.id; 

      
    const paymentId: string | null = await this.paymentService.processPayment(room.price, bookingId);

    if (!paymentId) {
      console.error('Payment failed! Cancelling booking...');
      return; 
    }

    console.log('Payment successful with ID:', paymentId);
    
      
      const roomRef = doc(this.firestore, 'rooms', room.id);
      await updateDoc(roomRef, { isAvailable: false});

      console.log('Room booked successfully!');

      
      if (bookingId) {
        this.userBookingId = bookingId; 
        this.router.navigate(['/booking-details', bookingId]);
      } else {
        console.error('Error: Booking ID is null, cannot navigate.');
      }
    } catch (err) {
      console.error('Error booking room:', err);
    }
  }
} 
     

