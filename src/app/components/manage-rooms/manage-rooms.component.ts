import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Room } from '../../../shared/room'; 

@Component({
  selector: 'app-manage-rooms',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.css'],
})
export class ManageRoomsComponent implements OnInit {
  private firestore = inject(Firestore);
  rooms$: Observable<Room[]>;
  rooms: Room[] = [];
  

  newRoom: Room = {
    type: '',
    price: 0,
    capacity: 0,
    amenities: [],
    isAvailable: true,
  };

  constructor() {
    const roomsCollection = collection(this.firestore, 'rooms');
    this.rooms$ = collectionData(roomsCollection, { idField: 'id' }) as Observable<Room[]>;
  }

  ngOnInit() {
    this.rooms$.subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  
  async addRoom() {
    const roomsCollection = collection(this.firestore, 'rooms');

    // Ensure amenities are stored as an array
    this.newRoom.amenities = this.newRoom.amenities.toString().split(',').map(a => a.trim());

    await addDoc(roomsCollection, this.newRoom);
    
    
    this.newRoom = { type: '', price: 0, capacity: 0, amenities: [], isAvailable: true };
  }

  
  async editRoom(room: Room) {
    if (!room.id) return;

    const roomRef = doc(this.firestore, 'rooms', room.id);
    await updateDoc(roomRef, { ...room });
  }

  
  async deleteRoom(roomId: string) {
    const roomRef = doc(this.firestore, 'rooms', roomId);
    await deleteDoc(roomRef);
  }
}
