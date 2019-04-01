import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Review } from '../models/review';
import { Account } from '../models/account';
// import { QuizService } from '../quiz.service';
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
  review: Review = new Review;
  quiz: Quiz;
  account: Account;
  boolAllReviews: Boolean = false;
  boolUserReviews: Boolean = false;
  reviewsAverage: Number = 0;
  reviewsMin: number = 0;
  reviewsMax: number = 0;
  userRatingNum: number = 1;
  userQuizIdInput: number = 1;
  validReviewInput: boolean = true;
  showBUR: string = "Show User Reviews";
  // boolQuizReviews: Boolean = false;

  // checks if the review array have any problems
  nullUndefinedZeroCheck(arr: Review[]) {
    if (arr === null || arr === undefined || arr.length === 0) {
      console.log('Array is found empty?')
      return false;
    }
    return true;
  }

  setZeroForStatistics() {
    this.reviewsAverage = 0;
    this.reviewsMax = 0;
    this.reviewsMin = 0;
  }

  onSubmitReview() {
    console.log('user quiz id input is: ', this.userQuizIdInput)
    console.log('user rating input is: ', this.userRatingNum)
    if(this.userQuizIdInput <= 0 || this.userRatingNum <= 0 || this.userRatingNum > 10) {
      this.validReviewInput = false;
      console.log('Invalid review input, min is 0, max 10 for ratings');
    }
    else {
      this.validReviewInput = true;
      console.log('review sanity check')
      console.log(this.review);
      this.review.quizId = this.userQuizIdInput;
      this.review.ratings = this.userRatingNum;
      this.review.userId = this.account.userId;
      console.log('review before posting')
      console.log(this.review);
      this.postUserReview(this.review); 
      this.boolUserReviews = false;
      this.showBUR = "Show User Reviews";
    }
  }

  onBARClick() {
    console.log('all reviews button clicked');
    this.boolAllReviews = !this.boolAllReviews;
    this.boolUserReviews = false;
    this.setZeroForStatistics();
    if (this.nullUndefinedZeroCheck(this.allReviews)) {
      this.calculateAverage(this.allReviews);
      this.calculateMinMax(this.allReviews);
    }
    console.log(`boolAllReviews is now ${this.boolAllReviews}`)
  }

  onBURClick() {
    console.log('user reviews button clicked');
    // things worked out and now lets refresh our list
    this.boolUserReviews = !this.boolUserReviews;
    this.boolAllReviews = false;
    this.showBUR = this.boolUserReviews ? "Hide User Reviews" : "Show User Reviews";
    this.setZeroForStatistics();
    this.getUserReviews(this.account);
    if(this.nullUndefinedZeroCheck(this.userReviews)){
      this.calculateAverage(this.userReviews);
      this.calculateMinMax(this.userReviews);
    }
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

  // GET for user reviews
  getUserReviews(account: Account) {
    this.reviewService.getReviewByUser(account).subscribe(data => {
      this.userReviews = data;
      console.log('get user reviews');
    }, err => console.log(err));
  }

  // User makes a POST for their review
  postUserReview(review: Review) {
    this.reviewService.addUserReview(review).subscribe(data => {
      this.review = review;
      console.log(this.review);
      this.getUserReviews(this.account);
    }, err => console.log(err));
  }

  // calculate min and max from review array
  calculateMinMax(reviewArray: Review[]) {
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

  // calculate average from review array
  calculateAverage(reviewArray: Review[]) {
    let len = reviewArray.length;
    let sum = 0;
    reviewArray.forEach(review => {
      if (review.ratings !== null){
        sum += review.ratings;
      }
    });
    if(len !== 0){
      this.reviewsAverage = sum / len;
    } else {
      this.reviewsAverage = 0;
    }
  }

  // initialize some values at start for page
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
