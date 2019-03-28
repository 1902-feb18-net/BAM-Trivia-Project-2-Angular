import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Quiz from './models/quiz';

@Injectable({
  providedIn: 'root'
})

export default class QuizService {
  public API = 'https://localhost:44338/api';
  // for now, let's just grab all quizzes
  public QUIZZES_API = `${this.API}/Quizzes`;
  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Quiz>> {
    return this.http.get<Array<Quiz>>(this.QUIZZES_API);
  }

  get(id: string) {
    return this.http.get(`${this.QUIZZES_API}/${id}`);
  }

  // can add other crud functionality later like add
}
