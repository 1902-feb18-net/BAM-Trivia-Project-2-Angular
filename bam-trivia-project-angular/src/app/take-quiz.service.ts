import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class TakeQuizService {
  public API = 'https://localhost:44338/api';
  // for now, let's just grab all quizzes
  // public QUIZZES_API = `${this.API}/Quizzes`;
  constructor(private http: HttpClient) { }
}
