import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { QuestionsService } from '../questions.service';

import { QuizComponent } from '../quiz/quiz.component'

import { Quiz } from '../models/quiz';
import { of } from 'rxjs';

// IM NOT SURE, keeps saying 
// No provider for Quiz!

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {
    const spySvc = jasmine.createSpyObj('QuestionsService', ['getQuestions']);
    const quiz: Quiz[] = [];

    spySvc.getQuestions.and.returnValue(of(quiz));

    TestBed.configureTestingModule({
      declarations: [ 
        QuestionsComponent, 
        QuizComponent
      ],
      providers: [
        {
          provide: [QuestionsService, Quiz],
          useValue: spySvc,
        }
      ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
