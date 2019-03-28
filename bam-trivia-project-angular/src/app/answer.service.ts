import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";

import { Answer } from './models/answer';

@Injectable({ providedIn: 'root' })
export class AnswerService {
  public API = 'https://localhost:44338/api';
  // for now, let's just grab all quizzes
  // public QUIZZES_API = `${this.API}/Quizzes`;
  constructor(private http: HttpClient) { }

  getAnswers(id: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.API}/Quizzes/${id}/Answers`)
      .pipe(
        catchError(this.handleError)
      );
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
