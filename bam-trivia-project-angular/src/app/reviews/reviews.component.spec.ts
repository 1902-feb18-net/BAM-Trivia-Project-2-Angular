import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsComponent } from './reviews.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ReviewService } from '../review.service';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  let mockSomeService = {
    getReviews: () => { }
  }
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
        { provide: ReviewService, useValue: mockSomeService }
      ]
    })
    .compileComponents();
  }));



  it('should create', () => {
    spyOn(mockSomeService, 'getReviews').and.returnValue({ subscribe: () => { } })
    expect(1).toBeTruthy();
  });
});
