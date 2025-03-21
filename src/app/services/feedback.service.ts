import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, where, collectionData, Timestamp } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Feedback } from '../../shared/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private firestore = inject(Firestore);

  constructor() {}

  
  async addFeedback(feedback: Feedback) {
    const feedbacksCollection = collection(this.firestore, 'feedbacks');
    feedback.createdAt = Timestamp.now();
    return await addDoc(feedbacksCollection, feedback);
  }

  
  getFeedbackByRoom(roomId: string): Observable<Feedback[]> {
    const feedbacksCollection = collection(this.firestore, 'feedbacks');
    const q = query(feedbacksCollection, where('roomId', '==', roomId));
    return collectionData(q, { idField: 'id' }) as Observable<Feedback[]>;
  }
}
