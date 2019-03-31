import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListComponent } from './quiz-list.component';
import { FormsModule } from '@angular/forms';
import { LoginInfoComponent } from '../login-info/login-info.component';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http'; 

describe('QuizListComponent', () => {
  let component: QuizListComponent;
  let fixture: ComponentFixture<QuizListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizListComponent,
        LoginComponent,
        LoginInfoComponent,
        LogoutComponent
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
    fixture = TestBed.createComponent(QuizListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
