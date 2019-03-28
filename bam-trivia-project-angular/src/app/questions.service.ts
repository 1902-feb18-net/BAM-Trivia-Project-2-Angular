import { Injectable } from '@angular/core';
import { Questions } from './models/questions';

import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { Quiz } from './models/quiz';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  public API = 'https://localhost:44338/api';
  // for now, let's just grab all quizzes
  // public QUIZZES_API = `${this.API}/Quizzes`;
  constructor(private http: HttpClient) { }
  getQuestions(quiz: Quiz): Observable<Questions[]> {
    return this.http.post<Questions[]>(`${this.API}/Quizzes`, quiz, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


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
      
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};