import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInfoComponent } from './login-info.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

describe('LoginInfoComponent', () => {
  let component: LoginInfoComponent;
  let fixture: ComponentFixture<LoginInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginInfoComponent ],
      imports: [
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
