import { Component, OnInit } from '@angular/core';
import { Answer } from '../models/answer';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  answers: Answer[];
  constructor(private answerService: AnswerService) { }

  ngOnInit() {
    
  }

  getAnswers(quizId: number) {
    this.answerService.getAnswers(quizId).subscribe(data => {
      console.log(data);
      this.answers = data;
    }, err => console.log(err));
  }

}
