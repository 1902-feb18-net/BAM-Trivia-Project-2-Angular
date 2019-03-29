import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Result } from './models/results';
import { Observable, throwError } from 'rxjs';


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
    return this.http.post<Result>(`${this.API}/Results`, result, httpOptions);
  }
}
