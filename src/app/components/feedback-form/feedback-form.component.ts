import { Component, Input, inject } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../../shared/feedback';

@Component({
  selector: 'app-feedback-form',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent {
  private feedbackService = inject(FeedbackService);
  private auth = inject(Auth);

  @Input() roomId!: string;
  rating = 5;
  review = '';

  async submitFeedback() {
    if (!this.auth.currentUser) {
      alert('You must be logged in to leave feedback.');
      return;
    }

    const feedback: Feedback = {
      userId: this.auth.currentUser.uid,
      roomId: this.roomId,
      rating: this.rating,
      review: this.review,
      createdAt: new Date(),
    };

    try {
      await this.feedbackService.addFeedback(feedback);
      alert('Feedback submitted successfully!');
      this.review = '';
      this.rating = 5;
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  }
}
