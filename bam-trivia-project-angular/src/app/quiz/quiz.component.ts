import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quiz: Quiz = new Quiz();

  constructor(private quizService: QuizService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.quizService.getRandomQuiz(this.quiz).subscribe(data => {
      console.log("callback");
      console.log(data);
      this.quiz = data;
      this.quizService.randomQuiz = this.quiz;
    }, err => console.log(err));

  }

}
