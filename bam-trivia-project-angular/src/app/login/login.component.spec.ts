import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from '../login.service'
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing'

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const spySvc = jasmine.createSpyObj('LoginService', ['login']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: LoginService, useValue: spySvc }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
