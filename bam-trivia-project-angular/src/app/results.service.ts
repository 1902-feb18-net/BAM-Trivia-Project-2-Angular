import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Result } from './models/results';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from "rxjs/internal/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class ResultsService {
  public API = 'https://localhost:44338/api';

  constructor(private http: HttpClient) { }
  
  questionResult: Result;

  sendResult(result: Result): Observable<Result> {
    console.log('sent result');
    return this.http.post<Result>(`${environment.apiUrl}/Results`, result, httpOptions)
    .pipe(catchError(error => {
      console.log('error:');
      console.log(error);
      // could inspect the error for what sort it is
      // (4xx status code, 5xx status code, httpclient failure itself)
      return throwError('Encountered an error communicating with the server.');
    }));;
  }
}
