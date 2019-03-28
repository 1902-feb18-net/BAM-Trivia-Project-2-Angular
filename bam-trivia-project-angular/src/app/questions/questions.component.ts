import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Questions } from '../models/questions';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: Questions[];
  constructor(private questionsService: QuestionsService, private quiz: Quiz) { }

  ngOnInit() {

  }

  // questionsService.getQuestions(quiz).subscribe(data => {
  //   console.log(data);
  //   this.questions = data;
  // }, err => console.log(err));
}
