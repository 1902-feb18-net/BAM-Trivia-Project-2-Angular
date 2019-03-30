import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerListComponent } from './answer-list.component';
import { AnswerService } from '../answer.service';
import { FormsModule } from '@angular/forms';

describe('AnswerListComponent', () => {
  let component: AnswerListComponent;
  let fixture: ComponentFixture<AnswerListComponent>;

  beforeEach(async(() => {

    const spySvc = jasmine.createSpyObj('AnswerService', ['getAnswers']);

    TestBed.configureTestingModule({
      declarations: [ AnswerListComponent ],
      imports: [FormsModule],
      providers: [
        { provide: AnswerService, useValue: spySvc}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
