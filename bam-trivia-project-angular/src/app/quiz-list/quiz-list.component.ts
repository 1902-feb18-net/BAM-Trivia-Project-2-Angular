import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../models/quiz';
import { Questions } from '../models/questions';
import { QuestionsService } from '../questions.service';
import { UserQuiz } from '../models/userquiz';
import { Account } from '../models/account';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})

export class QuizListComponent implements OnInit {
  quizzes: Quiz[];
  questions: Questions[];
  randomQuiz: Quiz;
  userQuizzes: UserQuiz[] = [];
  user: Account;
   constructor(private quizService: QuizService, private questionsService: QuestionsService) { }
  //constructor(private quizService: QuizService){}

  ngOnInit() {
    this.quizService.getQuizzes().subscribe(data => {
      console.log(data);
      this.quizzes = data;
    }, err => console.log(err));
    if (sessionStorage.getItem('account') !== null) {
      console.log(sessionStorage.getItem('account'));
      console.log("got stored account info");
      this.user = JSON.parse(sessionStorage.getItem('account'));
      console.log(this.user.userId);
    }
  }

  getQuestions(quiz : Quiz) { this.questionsService.getQuestions(quiz).subscribe(data => {
    console.log(data);
    this.questions = data;
  }, err => console.log(err));}

  getUserQuizzes(user: Account) {
      this.quizService.getUserQuizzes(user).subscribe(data => {
      console.log(data);
      this.userQuizzes = data;
    }, err => console.log(err));}
    
}



