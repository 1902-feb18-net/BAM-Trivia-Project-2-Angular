import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Result } from './models/results';
import { Review } from './models/review';
import { Quiz } from './models/quiz';
import { Account } from './models/account';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from "rxjs/internal/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  allReviews: Review[] = [];
  quizReviews: Review[] = [];

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/api/Reviews/Quiz`, { withCredentials: true })
      .pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
  }

  getReviewByQuiz(quiz: Quiz): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/api/Reviews/Quizzes/${quiz.id}`, { withCredentials: true })
      .pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
  }

  getReviewByUser(user: Account): Observable<Review[]> {
    return this.http.get<Review[]>(`${environment.apiUrl}/api/Reviews/Users/${user.userId}/Quiz`, { withCredentials: true })
      .pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
  }


}
