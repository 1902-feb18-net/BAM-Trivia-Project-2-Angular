import { TestBed } from '@angular/core/testing';

import { QuestionsService } from './questions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('QuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: QuestionsService = TestBed.get(QuestionsService);
    expect(service).toBeTruthy();
  });
});
