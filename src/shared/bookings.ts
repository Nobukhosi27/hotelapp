import { Timestamp } from '@firebase/firestore-types';

export interface Booking {
    id?: string;
    userId: string;
    roomId: string;
    type: string;
    price: number;
    bookedAt: Timestamp;
    checkIn: Timestamp;
    checkOut: Timestamp;
  }
  