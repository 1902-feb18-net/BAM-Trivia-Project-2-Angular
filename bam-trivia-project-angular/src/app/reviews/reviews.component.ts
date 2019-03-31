import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Review } from '../models/review';
import { QuizService } from '../quiz.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
  }

  quizReviews: Review[] = [];
  allReviews: Review[] = [];
  quiz: Quiz;

    getAllReviews() { this.reviewService.getReviews().subscribe(data => {
      this.allReviews = data;
    }, err => console.log(err));
  }

    getQuizReviews(quiz : Quiz) { this.reviewService.getReviewByQuiz(quiz).subscribe(data => {
      this.quizReviews = data;
    }, err => console.log(err));
  }
}
