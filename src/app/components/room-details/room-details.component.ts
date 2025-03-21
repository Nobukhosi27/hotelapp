import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { Feedback } from '../../../shared/feedback';

@Component({
  selector: 'app-room-details',
  imports: [CommonModule, NgFor, FeedbackFormComponent],
  standalone: true,
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private feedbackService = inject(FeedbackService);

  roomId: string = '';
  feedbacks$: Observable<Feedback[]> = new Observable<Feedback[]>();

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.feedbacks$ = this.feedbackService.getFeedbackByRoom(this.roomId);
  }
}
