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
      console.log(data);
      this.answers = data;
      this.getQuestionAnswers(this.questions[0]);
      this.getCorrectAnswer(this.questionAnswers)
    }, err => console.log(err));
  }

  startQuiz() {
     this.getQuestions(this.quizzes[0]);
     //this.getAnswers(1);

     this.questionsAnswered = 0;
     this.numberOfCorrectAnswers = 0;

    console.log("Start quiz has triggered!");
  }

  generateQuestion(question: Questions, answers: Answer[]) {

  }

  submittedAnswer(answer: Answer) {
    console.log("answer was submitted");
    console.log(answer);
    console.log(this.correctAnswer);
    this.questionsAnswered++;
    if(this.checkAnswer(answer))
    {
      this.numberOfCorrectAnswers++;
      console.log("answer was correct");
    }
  }

  submittedFillAnswer(answer: string) {
    console.log(`fill answer was submitted, ${answer}, correct answer is ${this.correctAnswer.answer}`);
    this.questionsAnswered++;
    if(this.checkFillAnswer(answer))
    {
      this.numberOfCorrectAnswers++;
      console.log("fill answer was correct");
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

  displayScore(): string {
    return `${this.numberOfCorrectAnswers}/10`;
  }

  //this returns the quiz percentage (ex: 80, 90, 20, etc.)
  calculateScore(): number {
    return this.numberOfCorrectAnswers * 10;
  }
}
