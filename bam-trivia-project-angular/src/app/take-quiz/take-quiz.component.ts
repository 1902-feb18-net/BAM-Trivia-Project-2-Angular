import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Questions } from '../models/questions';
import { Answer } from '../models/answer';
import { QuestionsService } from '../questions.service';
import { AnswerService } from '../answer.service';
import { TakeQuizService } from '../take-quiz.service';
import { QuizService } from '../quiz.service'
import { FormControl, FormGroup } from '@angular/forms';
import { distinct } from 'rxjs/internal/operators';
import { error } from '@angular/compiler/src/util';
import { elementStyleProp } from '@angular/core/src/render3';
import { Result } from '../models/results';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  quizzes: Quiz[] = [];
  questions: Questions[] = [];
  chosenQuiz: Quiz;
  answers: Answer[] = [];
  answeredQuestion: string;
  questionAnswers: Answer[] = [];
  correctAnswer: Answer;
  selectedAnswer: Answer;
  selectedAnswerString: string;
  givenQuestion: Questions;
  questionsAnswered: number;
  numberOfCorrectAnswers: number;
  quizIndex: number;
  result: Result;

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
    if (this.chosenQuiz != undefined)
    this.getAnswers(this.chosenQuiz.id);
    else
    this.getAnswers(this.quizzes[this.quizIndex].id);
    }, err => console.log(err));}

  getAnswers(quizId: number) {
    this.answerService.getAnswers(quizId).subscribe(data => {
      console.log(data);
      this.answers = data;
      this.getQuestionAnswers(this.questions[0]);
      this.getCorrectAnswer(this.questionAnswers)
    }, err => console.log(err));
  }

  sendResult(answer: Answer) {
    
  }

  startQuiz() {
    this.quizIndex = Math.floor((Math.random() * this.quizzes.length));
    this.getQuestions(this.quizzes[this.quizIndex]);

     this.questionsAnswered = 0;
     this.numberOfCorrectAnswers = 0;

    console.log("Start quiz has triggered!");
  }

  startRandomQuiz() {
    this.chosenQuiz = this.quizService.randomQuiz;
    this.getQuestions(this.chosenQuiz);

     this.questionsAnswered = 0;
     this.numberOfCorrectAnswers = 0;

    console.log("Start random quiz has triggered!");
  }

  submittedAnswer() {
    console.log("answer was submitted");
    console.log(this.selectedAnswer);
    console.log(this.correctAnswer);
    this.questionsAnswered++;
    if(this.checkAnswer(this.selectedAnswer))
    {
      this.numberOfCorrectAnswers++;
      console.log("answer was correct");
    }
    if (this.chosenQuiz != undefined && this.questionsAnswered < this.chosenQuiz.maxScore || this.questionsAnswered < this.quizzes[this.quizIndex].maxScore)
    {
    this.givenQuestion = this.questions[this.questionsAnswered];
    this.questionAnswers = [];
    this.getQuestionAnswers(this.questions[this.questionsAnswered]);
    this.getCorrectAnswer(this.questionAnswers);
    }
  }

  submittedFillAnswer() {
    console.log(`fill answer was submitted`);
    console.log(this.selectedAnswerString);
    this.questionsAnswered++;
    if(this.checkFillAnswer(this.selectedAnswerString))
    {
      this.numberOfCorrectAnswers++;
      console.log("fill answer was correct");
    }
    if (this.questionsAnswered < 10)
    {
      this.givenQuestion = this.questions[this.questionsAnswered];
      this.questionAnswers = [];
      this.getQuestionAnswers(this.questions[this.questionsAnswered]);
      this.getCorrectAnswer(this.questionAnswers);
    }
  }

  getCorrectAnswer(possibleAnswers: Answer[]): Answer {

    for (var i = 0; i < possibleAnswers.length; i++)
    {
      if (possibleAnswers[i].correct)
      {
        this.correctAnswer = possibleAnswers[i];
      }
    }
    return this.correctAnswer;
    
  }

  getQuestionAnswers(question: Questions) {

    for (var i = 0; i < this.answers.length; i++)
    {
      if (this.answers[i].questionId === question.id)
      {
        this.questionAnswers.push(this.answers[i]);
      }
        
    }
    console.log(this.questionAnswers)
    
  }

  checkAnswer(answer: Answer): boolean {
    if (answer === this.correctAnswer)
    {
      return true;
    }
    else
      return false;
  }

  checkFillAnswer(answer: string): boolean {
    if (answer === this.correctAnswer.answer)
    {
      return true;
    }
    else
      return false;
  }

  //this returns the quiz percentage (ex: 80, 90, 20, etc.)
  calculateScore(): number {
    return this.numberOfCorrectAnswers * 10;
  }
}
