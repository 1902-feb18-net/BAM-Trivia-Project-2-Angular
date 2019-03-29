import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { environment } from 'src/environments/environment';
import { Quiz } from './models/quiz';
import { Answer } from './models/answer';
import { UserQuiz } from './models/userquiz';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TakeQuizService {
  // for now, let's just grab all quizzes
  // public QUIZZES_API = `${this.API}/Quizzes`;
  constructor(private http: HttpClient) { }

  addUserQuiz(userquiz: UserQuiz): Observable<Quiz> {
    // /Users/{Id}/Quizzes
    console.log(`${environment.apiUrl}/Users/
    ${sessionStorage.getItem('account')['username']}/Quizzes`);
    console.log(sessionStorage.getItem('account')['username']);
    return this.http.post<Quiz>(`${environment.apiUrl}/Users/
    ${sessionStorage.getItem('account')['username']}/Quizzes`, {}, httpOptions)
      .pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
  }  

  addQuizAnswer(answer: Answer): Observable<Quiz> {
        // /Users/{Id}/Quizzes/{Id}/Results
    return this.http.post<Quiz>(`${environment.apiUrl}/Quizzes/${answer.userId}
    /Results`, answer, httpOptions)
      .pipe(catchError(error => {
        console.log('error:');
        console.log(error);
        // could inspect the error for what sort it is
        // (4xx status code, 5xx status code, httpclient failure itself)
        return throwError('Encountered an error communicating with the server.');
      }));
    }
  
}
