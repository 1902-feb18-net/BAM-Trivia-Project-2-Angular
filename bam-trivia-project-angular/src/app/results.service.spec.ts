import { TestBed } from '@angular/core/testing';

import { ResultsService } from './results.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ResultsService = TestBed.get(ResultsService);
    expect(service).toBeTruthy();
  });
});
