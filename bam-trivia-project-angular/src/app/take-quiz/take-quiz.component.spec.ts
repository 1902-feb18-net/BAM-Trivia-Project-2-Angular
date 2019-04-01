import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeQuizComponent } from './take-quiz.component';
import { FormsModule } from '@angular/forms';
import { QuizComponent } from '../quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http'; 

describe('TakeQuizComponent', () => {
  let component: TakeQuizComponent;
  let fixture: ComponentFixture<TakeQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TakeQuizComponent,
        QuizComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
