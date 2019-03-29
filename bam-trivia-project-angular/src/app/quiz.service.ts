import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";

import { Quiz } from './models/quiz';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class QuizService {
  // for now, let's just grab all quizzes
  // public QUIZZES_API = `${this.API}/Quizzes`;
  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${environment.apiUrl}/Quizzes`, { withCredentials: true })
      .pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
  }

  getRandomQuiz(quiz: Quiz): Observable<Quiz> {
    console.log('getRandomQuiz');
    return this.http.post<Quiz>(`${environment.apiUrl}/Quizzes/Random`, quiz, httpOptions)
      .pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
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
  // can add other crud functionality later like add
}
