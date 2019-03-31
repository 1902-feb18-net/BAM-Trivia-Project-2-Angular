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

  constructor(private reviewService: ReviewService, private quizService: QuizService) { }

  quizReviews: Review[] = [];
  allReviews: Review[] = [];
  userReviews: Review[] = [];
  review: Review;
  quiz: Quiz;
  account: Account;
  boolAllReviews: Boolean = false;
  boolUserReviews: Boolean = false;
  reviewsAverage: Number = 0;
  reviewsMin: number = 0;
  reviewsMax: number = 0;
  // boolQuizReviews: Boolean = false;

  onBARClick() {
    console.log('all reviews button clicked');
    this.boolAllReviews = !this.boolAllReviews;
    this.calculateAverage(this.allReviews);
    this.calculateMinMax(this.allReviews);
    this.boolUserReviews = false;
    console.log(`boolAllReviews is now ${this.boolAllReviews}`)
  }

  onBURClick() {
    console.log('user reviews button clicked');
    this.boolUserReviews = !this.boolUserReviews;
    this.calculateAverage(this.userReviews);
    this.calculateMinMax(this.userReviews);
    this.boolAllReviews = false;
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
      console.log('get all reviews')
    }, err => console.log(err));
  }

  // getQuizReviews(quiz: Quiz) {
  //   this.reviewService.getReviewByQuiz(quiz).subscribe(data => {
  //     this.quizReviews = data;
  //   }, err => console.log(err));
  // }

  getUserReviews(account: Account) {
    this.reviewService.getReviewByUser(account).subscribe(data => {
      this.userReviews = data;
      console.log('get user reviews');
    }, err => console.log(err));
  }

  postUserReview(review: Review) {
    this.reviewService.addUserReview(review).subscribe(data => {
      this.review = review;
      console.log(this.review)
    }, err => console.log(err));
  }

  calculateMinMax(reviewArray: Review[]) {
    // this.reviewsMin = Math.min.apply(null, reviewArray);
    // this.reviewsMax = Math.max.apply(null, reviewArray);
    let min = reviewArray[0].ratings;
    let max = reviewArray[0].ratings;
    reviewArray.forEach((r, i) => {
      let v = reviewArray[i].ratings;
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    });
    this.reviewsMin = min;
    this.reviewsMax = max;
    console.log(`min ${this.reviewsMin} and max ${this.reviewsMax}`)
  }

  calculateAverage(reviewArray: Review[]) {
    let len = reviewArray.length;
    let sum = 0;
    reviewArray.forEach(review => {
      if (review.ratings !== null){
        sum += review.ratings;
      }
    });
    if(len !== null){
      this.reviewsAverage = sum / len;
    } else {
      this.reviewsAverage = 0;
    }
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
