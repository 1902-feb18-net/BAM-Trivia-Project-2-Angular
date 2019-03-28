import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../models/quiz';
import { Questions } from '../models/questions';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent implements OnInit {
  quizzes: Quiz[];
  questions: Questions[];
   constructor(private quizService: QuizService, private questionsService: QuestionsService) { }
  //constructor(private quizService: QuizService){}

  ngOnInit() {
    this.quizService.getAll().subscribe(data => {
      console.log(data);
      this.quizzes = data;
    }, err => console.log(err));

  }

  getQuestions(quiz : Quiz) { this.questionsService.getQuestions(quiz).subscribe(data => {
    console.log(data);
    this.questions = data;
  }, err => console.log(err));}


}
