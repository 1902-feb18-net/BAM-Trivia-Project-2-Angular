import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";

import { Quiz } from './models/quiz';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class QuizService {
  public API = 'https://localhost:44338/api';
  // for now, let's just grab all quizzes
  // public QUIZZES_API = `${this.API}/Quizzes`;
  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.API}/Quizzes`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRandomQuiz(quiz: Quiz): Observable<Quiz> {
    console.log('getRandomQuiz');
    return this.http.post<Quiz>(`${this.API}/Quizzes/Random`, quiz, httpOptions);
      // .pipe(
      //   catchError(this.handleError('addHero', hero))
      // );

   
    // return this.http.get<Quiz>(`${this.API}/Quizzes/Random`)
    //   .pipe(
    //     catchError(this.handleError)
    //   );
  }

  // get(id: string) {
  //   return this.http.get(`${this.QUIZZES_API}/${id}`);
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  // can add other crud functionality later like add
}
