import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Review } from '../models/review';
import { Account } from '../models/account';
import { QuizService } from '../quiz.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(private reviewService: ReviewService) { }

  quizReviews: Review[] = [];
  allReviews: Review[] = [];
  userReviews: Review[] = [];
  quiz: Quiz;
  account: Account;
  boolAllReviews: Boolean = false;
  boolUserReviews: Boolean = false;
  // boolQuizReviews: Boolean = false;

  onBARClick() {
    console.log('all reviews button clicked');
    this.boolAllReviews = !this.boolAllReviews;
    console.log(`boolAllReviews is now ${this.boolAllReviews}`)
  }

  onBURClick() {
    console.log('user reviews button clicked');
    this.boolUserReviews = !this.boolUserReviews;
    console.log(`boolUserReviews is now ${this.boolUserReviews}`)
  }

  // onBQRClick() {
  //   console.log('all reviews button clicked');
  //   this.boolQuizReviews = !this.boolQuizReviews;
  //   console.log(`boolQuizReviews is now ${this.boolQuizReviews}`)
  // }

  getAllReviews() {
    this.reviewService.getReviews().subscribe(data => {
      this.allReviews = data;
      console.log(data)
    }, err => console.log(err));
  }

  getQuizReviews(quiz: Quiz) {
    this.reviewService.getReviewByQuiz(quiz).subscribe(data => {
      this.quizReviews = data;
    }, err => console.log(err));
  }

  getUserReviews(account: Account) {
    this.reviewService.getReviewByUser(account).subscribe(data => {
      this.userReviews = data;
      console.log('get user reviews');
      console.log(data);
    }, err => console.log(err));
  }

  ngOnInit() {
    if (sessionStorage.getItem('account') !== null) {
      this.account = JSON.parse(sessionStorage.getItem('account'));
    }
    console.log('checking account')
    console.log(this.account);
    this.getAllReviews();
    this.getUserReviews(this.account);
  }
}
