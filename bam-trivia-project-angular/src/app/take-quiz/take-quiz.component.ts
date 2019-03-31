import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { Questions } from '../models/questions';
import { Answer } from '../models/answer';
import { QuestionsService } from '../questions.service';
import { AnswerService } from '../answer.service';
import { TakeQuizService } from '../take-quiz.service';
import { QuizService } from '../quiz.service';
import { ResultsService } from '../results.service';
import { FormControl, FormGroup } from '@angular/forms';
import { distinct } from 'rxjs/internal/operators';
import { error } from '@angular/compiler/src/util';
import { elementStyleProp } from '@angular/core/src/render3';
import { Result } from '../models/results';
import { UserQuiz } from '../models/userquiz';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  quizzes: Quiz[] = []; //list of all quizzes
  questions: Questions[] = []; //list of all questions on quiz
  chosenQuiz: Quiz; //a quiz from randomly generated questions
  answers: Answer[] = []; //a list of all answers for the quiz
  answeredQuestion: string; //a string for the answered question
  questionAnswers: Answer[] = []; //all possible answers for question
  correctAnswer: Answer; //the correct answer for question
  selectedAnswer: Answer; //the selected answer for question
  selectedAnswerString: string; //the selected answer for fill-in-the-blank question
  givenQuestion: Questions; //the current question to be answered
  questionsAnswered: number; //the number of questions answered on this quiz
  numberOfCorrectAnswers: number; //the number of correct answers on this quiz
  quizIndex: number; //a randomm quiz index when picking a quiz at random
  result: Result = {
    // resultId: null,
    qId: null,
    userAnswer: null,
    userQuizId: null,
    correct: null
  }; //the result of a questiona, passed to API results
  userQuiz: UserQuiz;

  constructor(private questionsService: QuestionsService, private answerService: AnswerService,
    private takeQuizService: TakeQuizService, private quizService: QuizService, 
    private resultService: ResultsService, private loginService: LoginService) { }

  ngOnInit() {
    this.quizService.getQuizzes().subscribe(data => {
      console.log(data);
      this.quizzes = data;
    }, err => console.log(err));

    //this.startQuiz();
  }

  //gets all questions, includes all functions needed to set up a quiz
  getQuestions(quiz : Quiz) { this.questionsService.getQuestions(quiz).subscribe(data => {
    console.log(data);
    this.questions = data;
    this.givenQuestion = this.questions[0];
    if (this.chosenQuiz != undefined)
    this.getAnswers(this.chosenQuiz.id);
    else
    this.getAnswers(this.quizzes[this.quizIndex].id);
    }, err => console.log(err));}

    //gets all answers for the questions on the quiz, includes critical functions to set up quiz
  getAnswers(quizId: number) {
    this.answerService.getAnswers(quizId).subscribe(data => {
      console.log(data);
      this.answers = data;
      this.getQuestionAnswers(this.questions[0]);
      this.getCorrectAnswer(this.questionAnswers)
    }, err => console.log(err));
  }

  //sends the result of each question asked
  //TODO: add the userquiz ID
  sendResult(answer: Answer) {
    console.log(answer.answer);
    this.result.userAnswer = answer.answer;
    this.result.qId = answer.questionId;
    this.result.correct = answer.correct;
    this.result.userQuizId = 1;
    console.log(this.result);
    this.resultService.sendResult(this.result).subscribe(data => {
      this.resultService.questionResult = data;
    });

    console.log("result has been sent");
    
  }

  //runs whenever quiz starts; quiz is picked at random from list
  startQuiz() {
    this.quizIndex = Math.floor((Math.random() * this.quizzes.length));
    this.makeUserQuiz(this.quizzes[this.quizIndex]);
    this.getQuestions(this.quizzes[this.quizIndex]);

     this.questionsAnswered = 0;
     this.numberOfCorrectAnswers = 0;

    console.log("Start quiz has triggered!");
  }

  //runs whenever quiz starts; quiz is generated from random questions in a set category and difficulty
  startRandomQuiz() {
    this.chosenQuiz = this.quizService.randomQuiz;
    this.makeUserQuiz(this.chosenQuiz);
    this.getQuestions(this.chosenQuiz);

     this.questionsAnswered = 0;
     this.numberOfCorrectAnswers = 0;

    console.log("Start random quiz has triggered!");
  }

  //this runs when an answer is submitted
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
    console.log('selected answer is')
    console.log(this.selectedAnswer);
    this.sendResult(this.selectedAnswer);

    if (this.chosenQuiz != undefined && this.questionsAnswered < this.chosenQuiz.maxScore 
      || this.questionsAnswered < this.quizzes[this.quizIndex].maxScore)
    {
    this.givenQuestion = this.questions[this.questionsAnswered];
    this.questionAnswers = [];
    this.getQuestionAnswers(this.questions[this.questionsAnswered]);
    this.getCorrectAnswer(this.questionAnswers);
    }
  }

  //this runs when a fill-in-the-blank answer is submitted
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

  //this returns the correct answer for the question out of all possible answers for said question
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

  //this gets a list of all answers associated with a given question
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

  //this checks whether an answer is correct
  checkAnswer(answer: Answer): boolean {
    if (answer === this.correctAnswer)
    {
      return true;
    }
    else
      return false;
  }

  //this checks whether a fill-in-the-blank answer is correct
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

  makeUserQuiz(quiz: Quiz): void {
    this.userQuiz = new UserQuiz;
    this.userQuiz.userId = this.loginService.id;
    this.userQuiz.userName = this.loginService.username;
    this.userQuiz.quizId = quiz.id;
    this.userQuiz.quizMaxScore = quiz.maxScore;
    this.userQuiz.quizActualScore = 11;
    // this.userQuiz.quizDate = "";

   
    this.takeQuizService.addUserQuiz(this.userQuiz).subscribe(data => {
      console.log(data);
      // this.quizzes = data;
    }, err => console.log(err));

    //this.startQuiz();
  }
}
