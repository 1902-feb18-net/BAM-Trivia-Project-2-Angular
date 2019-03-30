import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LogoutService } from './logout.service';

describe('LogoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: LogoutService = TestBed.get(LogoutService);
    expect(service).toBeTruthy();
  });
});
