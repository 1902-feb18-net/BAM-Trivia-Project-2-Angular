import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Questions } from '../models/questions';
import { Answer } from '../models/answer';
import { QuestionsService } from '../questions.service';
import { AnswerService } from '../answer.service';
import { TakeQuizService } from '../take-quiz.service';
import { QuizService } from '../quiz.service'
import { distinct } from 'rxjs/internal/operators';
import { error } from '@angular/compiler/src/util';
import { elementStyleProp } from '@angular/core/src/render3';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  quizzes: Quiz[] = [];
  questions: Questions[] = [];
  answers: Answer[] = [];
  answeredQuestion: string;
  questionAnswers: Answer[] = [];
  correctAnswer: Answer;
  givenQuestion: Questions;
  questionsAnswered: number;
  numberOfCorrectAnswers: number;
  constructor(private questionsService: QuestionsService, private answerService: AnswerService,
    private takeQuizService: TakeQuizService, private quizService: QuizService) { }

  ngOnInit() {
    this.quizService.getQuizzes().subscribe(data => {
      console.log(data);
      this.quizzes = data;
    }, err => console.log(err));

    //this.startQuiz();

  }

  getQuestions(quiz : Quiz) { this.questionsService.getQuestions(quiz).subscribe(data => {
    console.log(data);
    this.questions = data;
    this.givenQuestion = this.questions[0];
    this.getAnswers(1);
    }, err => console.log(err));}

  getAnswers(quizId: number) {
    this.answerService.getAnswers(quizId).subscribe(data => {
      console.log(`answers: ${data}`);
      this.answers = data;
      this.getQuestionAnswers(this.questions[0]);
    }, err => console.log(err));
  }

  startQuiz() {
     this.getQuestions(this.quizzes[0]);
     //this.getAnswers(1);

     this.questionsAnswered = 0;
     this.numberOfCorrectAnswers = 0;
    
    //  if (this.questions != null && this.questions != undefined)
    //   this.givenQuestion = this.questions[0];
    // else
    //   console.log("given questions has not triggered possibly because it's async");

    console.log("Start quiz has triggered!");
  }

  generateQuestion(question: Questions, answers: Answer[]) {

  }

  inputAnswer(answer: string) {

  }

  getCorrectAnswer(question: Questions): Answer {

    // //This loops goes through a list of all answers received and selects
    // //  the ones that apply to the given question only
    // for (var i = 0; i < this.answers.length; i++)
    // {
    //   if (this.answers[i].id == question.id)
    //     this.questionAnswers.push(this.answers[i]);
    // }

    //This loops through the answers for the given question and returns
    //  the correct answer
    for (var i = 0; i < this.answers.length; i++)
    {
      if (this.answers[i].correct)
        this.correctAnswer = this.answers[i];
    }
      return this.correctAnswer;
  }

  getQuestionAnswers(question: Questions) {
    for (var i = 0; i < this.answers.length; i++)
    {
      console.log(`the for loop has triggered, answers[${i}].questionId == ${this.answers[i].questionId}`)
      if (this.answers[i].questionId === question.id)
      {
        this.questionAnswers.push(this.answers[i]);
        console.log("the if statement has triggered, it should trigger 4 times");
      }
        
    }
    console.log("getQuestionAnswers has triggered");
    console.log(this.questionAnswers)
  }

  checkAnswer(): boolean {
    this.questionsAnswered++;
    if (this.answeredQuestion == this.getCorrectAnswer(this.givenQuestion).answer)
    {
      this.numberOfCorrectAnswers++;
      return true;
    }
    else
      return false;
  }

  displayScore(): string {
    return `${this.numberOfCorrectAnswers}/10`;
  }

  //this returns the quiz percentage (ex: 80, 90, 20, etc.)
  calculateScore(): number {
    return this.numberOfCorrectAnswers * 10;
  }
}
