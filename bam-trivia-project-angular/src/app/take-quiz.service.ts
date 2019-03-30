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

  account: Account = JSON.parse(sessionStorage.getItem('account'));
  // username: string = this.account

  addUserQuiz(userquiz: UserQuiz): Observable<UserQuiz> {
    // /Users/{Id}/Quizzes
    // console.log(account);
    // console.log(`${this.username}`);
    console.log(this.account['userId']);
    console.log(userquiz);
    // this.url = ;
    // this.url = this.url.replace("%20", "");
    // console.log(this.url);
    return this.http.post<UserQuiz>(`${environment.apiUrl}/api/Users/${this.account['userId']}/Quizzes`, userquiz, httpOptions)
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
    return this.http.post<Quiz>(`${environment.apiUrl}/api/Quizzes/${answer.userId}
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
