import { Injectable } from '@angular/core';
import { Questions } from './models/questions';

import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { Quiz } from './models/quiz';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  // for now, let's just grab all quizzes
  // public QUIZZES_API = `${this.API}/Quizzes`;
  constructor(private http: HttpClient) { }
  getQuestions(quiz: Quiz): Observable<Questions[]> {
    return this.http.post<Questions[]>(`${environment.apiUrl}/Quizzes`, quiz, httpOptions)
      .pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
  }
      
}
