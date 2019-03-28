import { Component, OnInit } from '@angular/core';
import QuizService from '../quiz.service';
import Quiz from '../models/quiz';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent implements OnInit {
  quizzes: Array<Quiz>;
  constructor(private quizService: QuizService) { }
  
  ngOnInit() {
    this.quizService.getAll().subscribe(data => {
      this.quizzes = data;
      console.log(`data is: ${data}`)
    });
  }

}
