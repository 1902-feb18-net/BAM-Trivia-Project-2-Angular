import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsComponent } from './reviews.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ReviewService } from '../review.service';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  const spySvc = jasmine.createSpyObj('ReviewService', ['getReviews']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewsComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        { provide: ReviewService, useValue: spySvc }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
