import { TestBed } from '@angular/core/testing';

import { TakeQuizService } from './take-quiz.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TakeQuizService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TakeQuizService = TestBed.get(TakeQuizService);
    expect(service).toBeTruthy();
  });
});
