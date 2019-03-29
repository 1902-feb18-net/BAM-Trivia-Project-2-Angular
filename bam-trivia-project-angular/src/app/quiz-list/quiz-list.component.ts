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
  randomQuiz: Quiz;
   constructor(private quizService: QuizService, private questionsService: QuestionsService) { }
  //constructor(private quizService: QuizService){}

  ngOnInit() {
    this.quizService.getQuizzes().subscribe(data => {
      console.log(data);
      this.quizzes = data;
    }, err => console.log(err));
    if (sessionStorage.getItem('account') !== null) {
      console.log(sessionStorage.getItem('account'));
    }
  }

  getQuestions(quiz : Quiz) { this.questionsService.getQuestions(quiz).subscribe(data => {
    console.log(data);
    this.questions = data;
  }, err => console.log(err));}

  
    // this.quizService.getRandomQuiz(difficulty, category).subscribe
    // add(name: string): void {
    //   name = name.trim();
    //   if(!name) { return; }
    // this.heroService.addHero({ name } as Hero)
    //     .subscribe(hero => {
    //       this.heroes.push(hero);
    //     });
    // }
  // }

  // onSubmit() {
  //   this.api.login(this.login).subscribe(() => {
  //     this.router.navigate(['/char']);
  //   },
  //     error => {
  //       // should inspect error and put useful info on page
  //       console.log(error);
  //     });
  // }

}
