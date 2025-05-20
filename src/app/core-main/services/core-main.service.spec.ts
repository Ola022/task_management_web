import { TestBed } from '@angular/core/testing';

import { CoreMainService } from './core-main.service';

describe('CoreMainService', () => {
  let service: CoreMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
