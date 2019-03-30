import { TestBed } from '@angular/core/testing';

import { QuizService } from './quiz.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuizService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: QuizService = TestBed.get(QuizService);
    expect(service).toBeTruthy();
  });
});
