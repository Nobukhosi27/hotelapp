import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Room } from '../../shared/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private firestore = inject(Firestore);
  private roomsCollection = collection(this.firestore, 'rooms');

  getRooms(): Observable<Room[]> {
    return collectionData(this.roomsCollection, { idField: 'id' }) as Observable<Room[]>;
  }

  addRoom(room: Room) {
    return addDoc(this.roomsCollection, room);
  }
  async bookRoom(roomId: string): Promise<void> {
    const roomDoc = doc(this.firestore, 'rooms', roomId);
    await updateDoc(roomDoc, { isAvailable: false });
  }
}
