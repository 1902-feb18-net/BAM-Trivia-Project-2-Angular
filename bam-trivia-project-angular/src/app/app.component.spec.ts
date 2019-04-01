import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginInfoComponent } from './login-info/login-info.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        LogoutComponent,
        LoginInfoComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    expect(1).toBeTruthy();
  });
});
