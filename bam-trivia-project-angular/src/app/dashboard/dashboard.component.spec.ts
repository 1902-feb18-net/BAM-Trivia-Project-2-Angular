import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { LoginInfoComponent } from '../login-info/login-info.component';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http'; 

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent, 
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
